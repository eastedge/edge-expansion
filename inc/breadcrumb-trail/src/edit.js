
import { __ } from '@wordpress/i18n';

import './editor.scss';
//import { InspectorControls } from '@wordpress/block-editor';

import { PanelBody, PanelRow, RangeControl, SelectControl, TextControl, ToggleControl} from '@wordpress/components';
import { useBlockProps,InspectorControls, FontSizePicker } from '@wordpress/block-editor';

import { Fragment } from '@wordpress/element';
import './editor.scss';

export default function Edit( props ) {
	const { className, attributes, setAttributes} = props;
	const blockProps = useBlockProps();
  const { homeText, displayHomeIcon, homeIconMarginR, homeIconMarginT, homeIconMarginB, fontSize,icon,homeIcon,marginRight,marginLeft,marginTop,marginBottom,arrowWidth,iconSize} = attributes;
	
	//A function to add an inspector
	const getInspectorControls = () => {
	  return (
		<InspectorControls>
		  <PanelBody
			title={__(' Home Options','edge-expansion')} //Panel Title
			initialOpen={true} //Show panel open by default
		  >
      <PanelRow>
        <ToggleControl
          label={ __( 'Show Home Icon', 'edge-expansion' ) }
          checked={displayHomeIcon}
          onChange={(value) => setAttributes({ displayHomeIcon: value })}
        />
      </PanelRow>
      <PanelRow>
        <RangeControl
          label={__('Home Icon Right Margin', 'edge-expansion')}
          value={homeIconMarginR}
          onChange={(value) => setAttributes({ homeIconMarginR: value })}
          min={0}
          max={48}
        />
      </PanelRow>
      <PanelRow>
        <RangeControl
          label={__('Home Icon Top Margin', 'edge-expansion')}
          value={homeIconMarginT}
          onChange={(value) => setAttributes({ homeIconMarginT: value })}
          min={0}
          max={48}
        />
      </PanelRow>
      <PanelRow>
        <RangeControl
          label={__('Home Icon Bottom Margin', 'edge-expansion')}
          value={homeIconMarginB}
          onChange={(value) => setAttributes({ homeIconMarginB: value })}
          min={0}
          max={48}
        />
      </PanelRow>
        <TextControl
          label={__('Home Text Display', 'edge-expansion')}
          value={homeText}
          onChange={(value) => setAttributes({ homeText: value })}
        />
        <p>{__('e.g.','edge-expansion')}:Home</p>
		  <PanelRow>
        <div>
          <strong>{__('Title Font Size', 'edge-expansion')}</strong>
            <FontSizePicker
              value={fontSize}
              onChange={(size) => setAttributes({ fontSize: size })}
            />
        </div>
      </PanelRow>
		  </PanelBody>
      <PanelBody
			title={__(' Sub Page Options','edge-expansion')} //Panel Title
			initialOpen={true} //Show panel open by default
		  >

			<SelectControl
          label={__('Arrow Icon', 'edge-expansion')}
          value={icon}
          options={[
							{ label: __('select', 'edge-expansion'), value: '' },
              { label: __('Arrow right', 'edge-expansion'), value: 'dashicons-arrow-right-alt2' },
              { label: __('Right-Pointing Triangle', 'edge-expansion'), value: 'dashicons-arrow-right' },
              { label: __('Diagonal Line', 'edge-expansion'), value: 'diagonal' },
              // Add more Dashicons options here
          ]}
          onChange={(newIcon) => setAttributes({ icon: newIcon })}
      />
      <PanelRow>
        <RangeControl
          label={__('Arrow Icon Size', 'edge-expansion')}
          value={iconSize}
          onChange={(value) => setAttributes({ iconSize: value })}
          min={0}
          max={72}
        />
      </PanelRow>
			<PanelRow>
        <RangeControl
          label={__('Margin Horizontal Right', 'edge-expansion')}
          value={marginRight}
          onChange={(value) => setAttributes({ marginRight: value })}
          min={0}
          max={48}
        />
      </PanelRow>
			<PanelRow>
        <RangeControl
          label={__('Margin Horizontal Left', 'edge-expansion')}
          value={marginLeft}
          onChange={(value) => setAttributes({ marginLeft: value })}
          min={0}
          max={48}
        />
      </PanelRow>
			<PanelRow>
        <RangeControl
          label={__('Vertical Top Margin of Arrow', 'edge-expansion')}
          value={marginTop}
          onChange={(value) => setAttributes({ marginTop: value })}
          min={0}
          max={48}
        />
      </PanelRow>
			<PanelRow>
        <RangeControl
          label={__('Vertical Bottom Margin of Arrow', 'edge-expansion')}
          value={marginBottom}
          onChange={(value) => setAttributes({ marginBottom: value })}
          min={0}
          max={48}
        />
      </PanelRow>
			<PanelRow>
        <RangeControl
          label={__('Arrow Width', 'edge-expansion')}
          value={arrowWidth}
          onChange={(value) => setAttributes({ arrowWidth: value })}
          min={8}
          max={48}
        />
      </PanelRow>
		  </PanelBody>
		</InspectorControls>
	  );
	}
	return (
	  [
		getInspectorControls(), //Inspector
		<div className={"container " + className}>
			<div className={ 'wp-block-edge-breadcrumb-trail' } >
			<ul style={{fontSize:fontSize}}>
				<li><a href="">
        {displayHomeIcon && (<span class="dashicons dashicons-admin-home" style={{fontSize,marginRight:`${homeIconMarginR}px`,marginTop:`${homeIconMarginT}px`,marginBottom:`${homeIconMarginB}px` }}></span>)}</a>
        <a href=""><span style={{ fontSize }}>{homeText}</span></a><span className={`edgeicons dashicons ${icon}`} style={{ fontSize:`${iconSize}px`,width:`${arrowWidth}px`,marginTop:`${marginTop}px`,marginBottom:`${marginBottom}px`,marginRight:`${marginRight}px`,marginLeft:`${marginLeft}px`}}></span></li>
				<li><a href=""><span style={{ fontSize}}>{ __( 'Sub Page', 'edge-expansion' ) }</span></a><span className={`edgeicons dashicons ${icon}` } style={{ fontSize:`${iconSize}px`,width:`${arrowWidth}px`,marginTop:`${marginTop}px`,marginBottom:`${marginBottom}px`,marginRight:`${marginRight}px`,marginLeft:`${marginLeft}px` }}></span></li>
				<li><span style={{ fontSize}}>{ __( 'Sub Page', 'edge-expansion' ) }</span></li>
			</ul>
			</div>
		</div>
	  ]
	);
  }
  