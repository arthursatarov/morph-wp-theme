<?php
/**
 * Enqueue scripts and styles.
 *
 * @package MORPH
 */

namespace MORPH;

/**
 * Register and enqueue scripts.
 *
 * @return void
 */
function enqueue_scripts(): void {
	// Theme scripts.
	wp_register_script( 'morphs', SCRIPTS_URL . '/index.js', array(), THEME_VERSION, true );
	wp_enqueue_script( 'morph' );

	// Theme styles.
	wp_register_style( 'morph', STYLES_URL . '/index.css', array(), THEME_VERSION, 'all' );
	wp_enqueue_style( 'morph' );
}

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_scripts', 1 );
