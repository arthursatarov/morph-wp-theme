'use strict';

import gulp from 'gulp';
const { src, dest, watch, series, parallel } = gulp;
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcss from 'gulp-postcss';
import sortMediaQueries from 'postcss-sort-media-queries';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import esbuild from 'gulp-esbuild';
import browserSync from 'browser-sync';
import { deleteAsync } from 'del';
import newer from 'gulp-newer';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';

const paths = {
	src: {
		styles: './src/styles/main.scss',
		scripts: './src/scripts/main.js',
		fonts: './src/fonts/**/*.{ttf,eof,woff,woff2}',
		images: './src/images/**/*.{jpg,png,svg,gif,webp}',
	},
	build: {
		styles: './assets/styles/',
		scripts: './assets/scripts/',
		fonts: './assets/fonts/',
		images: './assets/images/',
	},
	watch: {
		php: '**/*.php',
		styles: './src/styles/**/*.scss',
		scripts: './src/scripts/**/*.js',
		images: './src/images/**/*.{jpg,png,svg,gif,webp}',
		fonts: './src/fonts/**/*.{ttf,eof,woff,woff2}',
	},
};

const onError = function (err) {
	notify.onError({
		message: '\n\n❌  ===> ERROR: <%= error.message %>\n',
	})(err);

	this.emit('end');
};

function scriptsDev() {
	let esbuildConfig = {
		target: 'es2020',
		bundle: true,
		write: false,
		sourcemap: 'inline',
	};

	return src(paths.src.scripts)
		.pipe(plumber({ errorHandler: onError }))
		.pipe(esbuild(esbuildConfig))
		.pipe(dest(paths.build.scripts))
		.pipe(browserSync.stream());
}

function scriptsProd() {
	let esbuildConfig = {
		target: 'es2020',
		bundle: true,
		write: false,
		minify: true,
	};

	return src(paths.src.scripts)
		.pipe(plumber({ errorHandler: onError }))
		.pipe(esbuild(esbuildConfig))
		.pipe(dest(paths.build.scripts))
		.pipe(browserSync.stream());
}

function stylesDev() {
	let postcssPlugins = [sortMediaQueries, autoprefixer];

	return src(paths.src.styles)
		.pipe(plumber({ errorHandler: onError }))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(postcss(postcssPlugins))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.build.styles))
		.pipe(browserSync.stream());
}

function stylesProd() {
	let postcssPlugins = [sortMediaQueries, autoprefixer, cssnano];

	return src(paths.src.styles)
		.pipe(plumber({ errorHandler: onError }))
		.pipe(sass())
		.pipe(postcss(postcssPlugins))
		.pipe(dest(paths.build.styles));
}

function copyFonts() {
	return src(paths.src.fonts)
		.pipe(plumber({ errorHandler: onError }))
		.pipe(newer(paths.build.fonts))
		.pipe(dest(paths.build.fonts))
		.pipe(browserSync.stream());
}

function copyImages() {
	return src(paths.src.images)
		.pipe(plumber({ errorHandler: onError }))
		.pipe(newer(paths.build.images))
		.pipe(dest(paths.build.images))
		.pipe(browserSync.stream());
}

function serve() {
	browserSync.init({
		ui: false,
		proxy: 'localhost:8000',
		port: 3000,
		open: false,
	});

	watch(paths.watch.php).on('change', browserSync.reload);
	watch(paths.watch.scripts, scriptsDev);
	watch(paths.watch.styles, stylesDev);
	watch(paths.watch.fonts, copyFonts);
	watch(paths.watch.images, copyImages);
}

function clean(cb) {
	deleteAsync(['./assets']).then(() => cb());
}

const dev = series(
	clean,
	parallel(scriptsDev, stylesDev, copyFonts, copyImages),
	serve
);

const prod = series(
	clean,
	parallel(scriptsProd, stylesProd, copyFonts, copyImages)
);

export { dev, prod, clean };
