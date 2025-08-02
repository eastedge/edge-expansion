<?php
/*
* Plugin Name: Edge Expansion
* Plugin URI: https://www.eastedge.jp/wordpress/plugin
* Description: This plugin is an all-in-one plugin with various features to enhance your website. It adds many of the features of the block editor and more. For example, it adds custom post types, latest posts list, related posts list, breadcrumbs, alternative thumbnail settings and many more. Each of these features can be toggled on/off individually.
* Version: 1.1.0
* Requires at least: 6.5
* Requires PHP:7.4
* Author: EastEdge
* Author URI: https://www.eastedge.jp/
* License: GPLv2 or later
* License URI: https://www.gnu.org/licenses/gpl-2.0.html
* Text Domain: edge-expansion
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'EDGEEX_PLUGIN_FILE', __FILE__ );
define( 'EDGEEX_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'EDGEEX_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

/*require_once(WP_PLUGIN_DIR . '/edge-expansion/admin/admin-setting-manage.php');
require_once(WP_PLUGIN_DIR . '/edge-expansion/admin/admin-detail-manage.php');
require_once(WP_PLUGIN_DIR . '/edge-expansion/admin/admin-manage.php');
require_once(WP_PLUGIN_DIR . '/edge-expansion/admin/settings/components-manager.php');*/

require_once EDGEEX_PLUGIN_DIR . 'admin/admin-setting-manage.php';
require_once EDGEEX_PLUGIN_DIR . 'admin/admin-detail-manage.php';
require_once EDGEEX_PLUGIN_DIR . 'admin/admin-manage.php';
require_once EDGEEX_PLUGIN_DIR . 'admin/settings/components-manager.php';

function edgeex_plugin_menu() {
	$parent_slug = 'edge_main_menu';

	add_menu_page( 
		esc_html__('Edge Expansion', 'edge-expansion'),  
		esc_html__('Edge Expansion', 'edge-expansion'),
		'manage_options',
		$parent_slug, 
		'edgeex_manage_expansion',
		'dashicons-admin-generic',
		81 
	);
	add_submenu_page( 
		$parent_slug, 
		esc_html__('Edge Detail Settings', 'edge-expansion'), 
		esc_html__('Edge Detail Settings', 'edge-expansion'), 
		'manage_options',
		'edgeex_add_setting_page',
		'edgeex_manage_display' 
	);

}
add_action( 'admin_menu', 'edgeex_plugin_menu' );

/*
  Load master setting page
/*-------------------------------------------*/

function edgeex_plugin_init() {
	global $edgeex_options;
	$edgeex_options = edgeex_get_common_options();//Almost the same as get_option('East_common_options')
	wp_set_script_translations( 'edge-expansion-script', 'edge-expansion' );
	
}
add_action( 'init', 'edgeex_plugin_init' );


add_action( 'init', function() {
    add_post_type_support('page', 'excerpt');
});


/*----------------------------------------------------------
*Block Categories
*----------------------------------------------------------*/
function edgeex_filter_block_categories_when_post_provided( $block_categories, $editor_context ) {
    if ( ! empty( $editor_context->post ) ) {
        array_push(
            $block_categories,
            array(
                'slug'  => 'edge',
                'title' =>  'edge',
                'icon'  => null,
            )
        );
    }
    return $block_categories;
}
add_filter( 'block_categories_all', 'edgeex_filter_block_categories_when_post_provided', 10, 2 );


/*----------------------------------------------------------
*Dashicons
*----------------------------------------------------------*/
//if ( ! function_exists( 'edge_load_dashicons' ) ) :
function edgeex_load_dashicons() {
	wp_enqueue_style('dashicons');
}
//endif;
add_action( 'wp_print_styles', 'edgeex_load_dashicons');


/*----------------------------------------------------------
*Scripts & CSS
*----------------------------------------------------------*/
/*function edgeex_admin_register_css() {
    wp_enqueue_style(
		'edge-admin-style',
		plugins_url( '', __FILE__ ) . '/assets/css/edge_admin.css',
		array(),
		'1.4'
	);
	wp_enqueue_style(
		'edge-css-style',
		plugins_url( '', __FILE__ ) . '/assets/css/edge-admin-detail.css',
		array(),
		'1.4'
	);
}
add_action( 'admin_enqueue_scripts', 'edgeex_admin_register_css' );

function edgeex_expansion_enqueue() {
	wp_enqueue_script(
		'pagetop-btn-script',
		plugins_url( '', __FILE__ ) . '/inc/button-backtotop/js/pagetop-btn.js',
		array('jquery'),
		'1.4',
		true
	); 
}
add_action( 'wp_enqueue_scripts', 'edgeex_expansion_enqueue' );*/


/*----------------------------------------------------------
*Scripts & CSS
*----------------------------------------------------------*/
function edgeex_admin_register_css() {
    wp_enqueue_style(
		'edge-admin-style',
		EDGEEX_PLUGIN_URL . '/assets/css/edge_admin.css',
		array(),
		'1.4'
	);
	wp_enqueue_style(
		'edge-css-style',
		EDGEEX_PLUGIN_URL . '/assets/css/edge-admin-detail.css',
		array(),
		'1.4'
	);
}
add_action( 'admin_enqueue_scripts', 'edgeex_admin_register_css' );

function edgeex_expansion_enqueue() {
	wp_enqueue_script(
		'pagetop-btn-script',
		EDGEEX_PLUGIN_URL . '/inc/button-backtotop/js/pagetop-btn.js',
		array('jquery'),
		'1.4',
		true
	); 
}
add_action( 'wp_enqueue_scripts', 'edgeex_expansion_enqueue' );




/*----------------------------------------------------------
*Uninstall Settings
*----------------------------------------------------------*/

if(function_exists('register_uninstall_hook')) {
	//register_uninstall_hook (__FILE__, 'edgeex_plugin_uninstall');
	register_uninstall_hook (EDGEEX_PLUGIN_FILE, 'edgeex_plugin_uninstall');
	
}