<?php

namespace DM\Blocks\ImageSlider;

add_action( 'plugins_loaded', __NAMESPACE__ . '\register_block' );

function register_block() {
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	register_block_type( 'dm-wp-gbblocks/sticky-posts', [
		'render_callback' => __NAMESPACE__ . '\render_block',
	] );

}

/**
 * @return string
 */
function render_block() {
	$limit        = 10;
	$recent_posts = wp_get_recent_posts( [
		'numberposts' => $limit,
		'post_status' => 'publish',
	] );

	if ( empty( $recent_posts ) ) {
		return '<p>No posts</p>';
	}

	$output = '<ul>';

	foreach ( $recent_posts as $post ) {
		$post_id = $post['ID'];
		$output  .= sprintf(
			'<li><a href="%1$s">%2$s</a><img src="%3$s" </li>',
			esc_url( get_permalink( $post_id ) ),
			esc_html( get_the_title( $post_id ) ),
			esc_url( get_the_post_thumbnail_url( $post_id, 'full' ) )
		);
	}

	$output .= '</ul>';
	return $output;
}
