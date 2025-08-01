import { registerBlockType } from '@wordpress/blocks';
import './editor.scss';
import './style.scss';
import Edit from './edit';
import Save from './save';

registerBlockType('edge/definition-list-block', {
  edit: Edit,
  save: Save,
});