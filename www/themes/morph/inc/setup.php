<?php
/**
 * Theme Setup
 *
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * @package MORPH
 */

namespace MORPH;

/**
 * Sets up theme defaults and registers support
 * for various WordPress features.
 *
 * @return void
 */
function setup(): void {
	// Registers navigation menus for the theme.
	register_nav_menus(
		array(
			'primary' => esc_html__( 'Primary', 'morph' ),
		)
	);

	/**
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	/**
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/**
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);
}

add_action( 'after_setup_theme', __NAMESPACE__ . '\setup' );
