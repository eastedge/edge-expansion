import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls, FontSizePicker,BlockControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, SelectControl, RangeControl, ColorPalette, TextControl } from '@wordpress/components';

const ALIGNMENT_OPTIONS = [
    { label:  __('Left', 'edge-expansion'), value: 'left' },
    { label: __('Center', 'edge-expansion'), value: 'center' },
    { label: __('Right', 'edge-expansion'), value: 'right' },
];

export default function Edit({ attributes, setAttributes }) {
    const { content, icon, iconPosition, iconSize, iconColor, spacingVer, spacingTop, spacingBottom,textFontSize, alignment} = attributes;

    const blockProps = useBlockProps({
        className: 'dashicons-text-container',
        style: {
            width:'100%'
            //color: textColor,
            //backgroundColor: bgColor
        },
    });


    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Icon Settings', 'edge-expansion')}>
                    
                    <TextControl
                        label={__('Icon', 'edge-expansion')}
                        value={icon}
                        onChange={(value) => setAttributes({ icon: value })}
                    />
                    <p>{__('Enter the class name of the desired icon font from the Dashicons list page.', 'edge-expansion')}<br></br><a href="https://developer.wordpress.org/resource/dashicons/#html" target="_blank">the Dashicons list page</a></p>
                    
                    <RangeControl
                        label={__('Icon Size', 'edge-expansion')}
                        value={iconSize}
                        onChange={(value) => setAttributes({ iconSize: value })}
                        min={10}
                        max={80}
                    />
                    <ColorPalette
                        value={iconColor}
                        onChange={(value) => setAttributes({ iconColor: value })}
                    />
                    <SelectControl
                        label={__('Icon Position', 'edge-expansion')}
                        value={iconPosition}
                        options={[ 
                            { label: 'Left', value: 'left' }, 
                            { label: 'Right', value: 'right' }, 
                            { label: 'Icon Only', value: 'icon-only' }
                        ]}
                        onChange={(value) => setAttributes({ iconPosition: value })}
                    />
                    <RangeControl
                        label={__('Spacing Vertical', 'edge-expansion')}
                        value={spacingVer}
                        onChange={(value) => setAttributes({ spacingVer: value })}
                        min={0}
                        max={48}
                    />
                    <RangeControl
                        label={__('Spacing Top', 'edge-expansion')}
                        value={spacingTop}
                        onChange={(value) => setAttributes({ spacingTop: value })}
                        min={0}
                        max={48}
                    />
                    <RangeControl
                        label={__('Spacing Vertical', 'edge-expansion')}
                        value={spacingBottom}
                        onChange={(value) => setAttributes({ spacingBottom: value })}
                        min={0}
                        max={48}
                    />
                </PanelBody>
                    <PanelBody title={__('Text Settings', 'edge-expansion')}>
                    <PanelRow>
                    <div>
                    <strong>{__('Font Size', 'edge-expansion')}</strong>
                    <FontSizePicker
                        value={textFontSize}
                        onChange={(size) => setAttributes({ textFontSize: size })}
                    />
                    </div>
                    </PanelRow>
                </PanelBody>
                <PanelBody title={__('Layout Settings', 'edge-expansion')} initialOpen={false}>
                    <SelectControl
                        label={__('Arrangement', 'edge-expansion')}
                        value={alignment}
                        options={ALIGNMENT_OPTIONS}
                        onChange={(value) => setAttributes({ alignment: value })}
                    />
                    {alignment}
                </PanelBody>
                
            </InspectorControls>
            <div {...blockProps}>
            <div className={`edge-dashicons-text align-${alignment}`}>
                {(iconPosition === 'left' || iconPosition === 'icon-only') && (<span className={`dashicons ${icon}`} style={{ fontSize: iconSize, color: iconColor, marginRight: spacingVer, marginTop: spacingTop, marginBottom: spacingBottom }}></span>)}
                {iconPosition !== 'icon-only' && (
                    <RichText
                    tagName="p"
                    style={{fontSize:`${textFontSize}`}}
                    value={content}
                    onChange={(value) => setAttributes({ content: value })}
                />
                )}
                {iconPosition === 'right' && (<span className={`dashicons ${icon}`} style={{ fontSize: iconSize, color: iconColor, marginLeft: spacingVer, marginTop: spacingTop, marginBottom: spacingBottom }}></span>)}
            
            </div>
            
            </div>

            
        </>
    );
}