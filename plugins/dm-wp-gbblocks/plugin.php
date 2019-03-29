<?php
/**
 * Plugin Name: Dang Media Gutenberg Blocks
 * Plugin URI: https://trungdang.de
 * Description: Dang Media Gutenberg Blocks
 * Author: Trung Dang
 * Author URI: https://trungdang.de
 * Version: 1.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
