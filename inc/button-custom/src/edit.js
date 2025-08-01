import { __ } from '@wordpress/i18n';
import {useBlockProps, InspectorControls, FontSizePicker, PanelColorSettings } from '@wordpress/block-editor';
import {BlockControls,AlignmentToolbar,__experimentalLinkControl as LinkControl,RichText} from '@wordpress/block-editor';
import {PanelBody,PanelRow,TextControl,SelectControl,ColorPalette,RangeControl} from '@wordpress/components';
import {ToolbarGroup, ToolbarButton ,Popover} from '@wordpress/components';
import { useState, useRef } from '@wordpress/element';

const ALIGNMENT_OPTIONS = [
    { label:  __('Left', 'edge-expansion'), value: 'left' },
    { label: __('Center', 'edge-expansion'), value: 'center' },
    { label: __('Right', 'edge-expansion'), value: 'right' },
];

export default function Edit({ attributes, setAttributes }) {
    const { 
        buttonText,
        buttonWidth,
        buttonHeight,
        fontSize,
        textColor, 
        bgColor, 
        hoverTextColor, 
        hoverBgColor,
        borderRadius,
        borderColor,
        borderWidth,
        paddingVertical,
        textAlign,
        alignment,
        url,
        opensInNewTab,
        buttonLink } = attributes;
    
    const blockProps = useBlockProps({
        className: `button-block-container align-${alignment}`,
        style: {
            width:'100%'
        },
    });
    const [ showLinkPopover, setShowLinkPopover ] = useState( false );
    const [ showPopover, setShowPopover ] = useState( false );
	const buttonRef = useRef( null );

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Button Settings', 'edge-expansion')} initialOpen={true}>
                    <TextControl
                        label={__('button Text', 'edge-expansion')}
                        value={buttonText}
                        onChange={(value) => setAttributes({ buttonText: value })}
                    />
                    <RangeControl
                        label={ __('Button Width', 'edge-expansion') }
                        value={ buttonWidth }
                        onChange={ (value) => setAttributes({ buttonWidth: value }) }
                        min={16} max={840}
                    />
                    <RangeControl
                        label={ __('Button Height', 'edge-expansion') }
                        value={ buttonHeight }
                        onChange={ (value) => setAttributes({ buttonHeight: value }) }
                        min={16} max={360}
                    />
                    <PanelRow>
                    <div>
                    <strong>{__('Font Size', 'edge-expansion')}</strong>
                    <FontSizePicker
                        value={fontSize}
                        onChange={(size) => setAttributes({ fontSize: size })}
                    />
                    </div>
                    </PanelRow>
                </PanelBody>
                <PanelBody title={__('Style Settings', 'edge-expansion')} initialOpen={true}>
                    
                    <RangeControl
                        label={__('Rounded Corners(%)', 'edge-expansion')}
                        value={borderRadius}
                        onChange={(value) => setAttributes({ borderRadius: value })}
                        min={0}
                        max={50}
                    />
                    <PanelColorSettings
                    title={__('Border Color', 'edge-expansion')}
                    colorSettings={[
                        {
                            value: borderColor,
                            onChange: (value) => setAttributes({ borderColor: value }),
                            label: __('Border Color', 'edge-expansion')
                        }
                    ]}
                />
                    
                    <RangeControl
                        label={__('Border Thickness(px)', 'edge-expansion')}
                        value={borderWidth}
                        onChange={(value) => setAttributes({ borderWidth: value })}
                        min={0}
                        max={16}
                    />
                </PanelBody>
                <PanelBody title={__('Color Settings', 'edge-expansion')}>
                <PanelColorSettings
                    title={__('Color', 'edge-expansion')}
                    colorSettings={[
                        {
                            value: textColor,
                            onChange: (value) => setAttributes({ textColor: value }),
                            label: __('Text Color', 'edge-expansion')
                        },
                        {
                            value: bgColor,
                            onChange: (value) => setAttributes({ bgColor: value }),
                            label: __('Background Color', 'edge-expansion')
                        },
                        {
                            value: hoverTextColor,
                            onChange: (value) => setAttributes({ hoverTextColor: value }),
                            label: __('Hover Text Color', 'edge-expansion')
                        },
                        {
                            value: hoverBgColor,
                            onChange: (value) => setAttributes({ hoverBgColor: value }),
                            label: __('Hover Background Color', 'edge-expansion')
                        }
                    ]}
                />
                </PanelBody>

                <PanelBody title={__('Layout Settings', 'edge-expansion')} initialOpen={true}>
                    <SelectControl
                        label={__('Text Arrangement', 'edge-expansion')}
                        value={textAlign}
                        options={ALIGNMENT_OPTIONS}
                        onChange={(value) => setAttributes({ textAlign: value })}
                    />
                    <RangeControl
                        label={ __('Padding Vertical', 'edge-expansion') }
                        value={ paddingVertical }
                        onChange={ (value) => setAttributes({ paddingVertical: value }) }
                        min={0} max={360}
                    />
                </PanelBody>
            </InspectorControls>

            <BlockControls>
				<AlignmentToolbar
					value={ alignment }
					onChange={ ( newAlign ) => setAttributes( { alignment: newAlign } ) }
				/>
				
				<ToolbarGroup>
					<ToolbarButton
						icon= "admin-links"
						label=  {__('Set up a link','edge-expansion')}
						ref= { buttonRef }
						onClick={ () => setShowPopover( (prev) => !prev ) }
					/>
				</ToolbarGroup>
			</BlockControls>

			{ showPopover && (
				<Popover
					anchorRef={ buttonRef.current }
					onClose={ () => setShowPopover( false ) }
					focusOnMount={ false }
					placement="bottom-start"
				>
					<LinkControl
						value={ { url, opensInNewTab } }
						onChange={ ( newLink ) => {
							setAttributes( {
		                        url: newLink.url,
		                        opensInNewTab: newLink.opensInNewTab,
	                        } );
	                        setTimeout( () => setShowPopover( false ), 10 ); // A little delay
                        } }
						settings={ [
							{
								id: 'opensInNewTab',
								title:  __('Open in new tab','edge-expansion'),
								onChange: ( val ) => setAttributes( { opensInNewTab: val } ),
								checked: opensInNewTab
							}
						] }
					/>
				</Popover>
			) }


            <div {...blockProps}>
            <div className="custom-button">
                <a
                href={buttonLink || '#'}
                className={`button-block`}
                style={{
                borderRadius: `${borderRadius}%`,
                border: `${borderWidth}px solid ${borderColor}`,
                fontSize: fontSize,
                width:`${buttonWidth}px`,
                height:`${buttonHeight}px`,
                lineHeight: `${paddingVertical}px`,
                textAlign: textAlign,
            }}

            onMouseOver={(e) => {
                e.target.style.color = hoverTextColor || textColor;
                e.target.style.backgroundColor = hoverBgColor || bgColor;
            }}
            onMouseOut={(e) => {
                e.target.style.color = textColor;
                e.target.style.backgroundColor = bgColor;
            }}
            >
               {buttonText}
                </a>
            </div>
            </div>
        </>
    );
}
