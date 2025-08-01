import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import './style.scss';
import Edit from './edit';
import save from './save';

registerBlockType('edge/custom-post-type', {
	title: __('Custom Post Type','edge-expansion'),
	description: __('Add custom post types and custom taxonomies','edge-expansion'),
	category: 'edge',
	icon: 'book',
	supports: {
	  html: false,
	},
    edit: Edit,
    save,
});
