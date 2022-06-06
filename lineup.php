<?php
/**
 * Plugin Name:       Lineup
 * Description:       Inline block examples.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       lineup
 *
 * @package           s8-lineup
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_lineup_block_init() {
	register_block_type( __DIR__ . '/build/lineup', [
		'render_callback' => 'create_block_render_lineup'
	] );
	register_block_type( __DIR__ . '/build/text' );
	register_block_type( __DIR__ . '/build/ip', [
		'render_callback' => 'create_block_render_ip'
	] );
	register_block_type( __DIR__ . '/build/special' );
}
add_action( 'init', 'create_block_lineup_block_init' );

/**
 * Renders Lineup block, removing whitespace from between tags.
 */
function create_block_render_lineup( $attributes, $content ) {
	return trim(preg_replace('/>\s+</', '><', $content));
}


function create_block_render_ip() {
	return "<span class=\"wp-block-s8-ip\">{$_SERVER['REMOTE_ADDR']}</span>";
}

function create_block_print_ip_to_js(){
	$ns = '"s8/"';
	return "if ( ! ($ns in window ) ) window[$ns] = { ip: '{$_SERVER['REMOTE_ADDR']}' };";
}

add_action( 'enqueue_block_editor_assets', function() {
	$handle = 's8-ip-editor-script';
	wp_add_inline_script( $handle, create_block_print_ip_to_js(), 'before' );
} );
