<?php
/**
 * MORPH functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package MORPH
 */

namespace MORPH;

/**
 * Theme constants.
 */
const THEME_VERSION = '0.0.1';

define( 'MORPH_THEME_DIR', get_template_directory() );
define( 'MORPH_THEME_URL', get_template_directory_uri() );

// Fonts.
const FONTS_DIR = MORPH_THEME_DIR . '/assets/fonts';
const FONTS_URL = MORPH_THEME_URL . '/assets/fonts';
// Images.
const IMG_DIR = MORPH_THEME_DIR . '/assets/images';
const IMG_URL = MORPH_THEME_URL . '/assets/images';
// Scripts.
const SCRIPTS_DIR = MORPH_THEME_DIR . '/assets/scripts';
const SCRIPTS_URL = MORPH_THEME_URL . '/assets/scripts';
// Styles.
const STYLES_DIR = MORPH_THEME_DIR . '/assets/styles';
const STYLES_URL = MORPH_THEME_URL . '/assets/styles';

/**
 * Include files.
 */
require_once MORPH_THEME_DIR . '/inc/setup.php';
require_once MORPH_THEME_DIR . '/inc/enqueue.php';
