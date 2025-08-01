import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls, PanelColorSettings, FontSizePicker } from '@wordpress/block-editor';
import { PanelBody, PanelRow, Button, TextControl, SelectControl, RangeControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

const Edit = ({ attributes, setAttributes }) => {
  const { items, dtFontSize, dtFontWeight, dtTextColor, ddFontSize, ddFontWeight, ddVerticalMargin, ddLeftMargin } = attributes;

  const addItem = () => {
    const newItems = [...items, { term: '', description: '' }];
    setAttributes({ items: newItems });
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setAttributes({ items: newItems });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setAttributes({ items: newItems });
  };

  return (
    <Fragment>
      <InspectorControls>
        <PanelBody title={__('DT Style Settings', 'edge-expansion')}>
         
          <PanelRow>
            <div>
              <strong>{__('Font Size (dt)', 'edge-expansion')}</strong>
                <FontSizePicker
                  value={dtFontSize}
                  onChange={(size) => setAttributes({ dtFontSize: size })}
              />
            </div>
          </PanelRow>
          <SelectControl
            label={__('Font Weight (dt)', 'edge-expansion')}
            value={dtFontWeight}
            options={[
              { label: 'Bold', value: 'bold' },
              { label: 'Normal', value: 'normal' }
            ]}
            onChange={(value) => setAttributes({ dtFontWeight: value })}
          />
          <PanelColorSettings
            title={__('Color Settings', 'edge-expansion')}
            colorSettings={[
              {
                value: dtTextColor,
                onChange: (value) => setAttributes({ dtTextColor: value }),
                label: __('Text Color', 'edge-expansion')
              }
            ]}
          />
        </PanelBody>
        <PanelBody title={__('DD Style Settings', 'edge-expansion')}>
          <PanelRow>
            <div>
              <strong>{__('Font Size (dd)', 'edge-expansion')}</strong>
                <FontSizePicker
                  value={ddFontSize}
                  onChange={(size) => setAttributes({ ddFontSize: size })}
              />
            </div>
          </PanelRow>
          <SelectControl
            label={__('Font Weight (dd)', 'edge-expansion')}
            value={ddFontWeight}
            options={[
              { label: 'Bold', value: 'bold' },
              { label: 'Normal', value: 'normal' }
            ]}
            onChange={(value) => setAttributes({ ddFontWeight: value })}
          />
          <PanelRow>
            <RangeControl
							label={ __( 'Margin(top and bottom)', 'edge-expansion' ) }
							value={ ddVerticalMargin }
							onChange={ ( value ) => setAttributes( { ddVerticalMargin: value } )}
							min={ 0 }
							max={ 36 }
					/ >
          </PanelRow>
          <PanelRow>
            <RangeControl
							label={ __( 'Margin(left)', 'edge-expansion' ) }
							value={ ddLeftMargin }
							onChange={ ( value ) => setAttributes( { ddLeftMargin: value } )}
							min={ 0 }
							max={ 48 }
					/ >
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      <div {...useBlockProps()}>
      <div className="wp-block-custom-definition-list-block">
        <dl className="definition-item">
          {items.map((item, index) => (
            <div key={index}>
              <RichText
                tagName="dt"
                value={item.term}
                onChange={(value) => updateItem(index, 'term', value)}
                placeholder="Enter term..."
                style={{ fontSize: dtFontSize, fontWeight: dtFontWeight, color: dtTextColor}}
              />
              <RichText
                tagName="dd"
                value={item.description}
                onChange={(value) => updateItem(index, 'description', value)}
                placeholder="Enter description..."
                style={{ fontSize: ddFontSize, fontWeight: ddFontWeight, marginTop:`${ddVerticalMargin}px`, marginBottom:`${ddVerticalMargin}px`, marginLeft:`${ddLeftMargin}px` }}
              />
              <Button className="remove-button" isDestructive onClick={() => removeItem(index)}>{__('Remove', 'edge-expansion')}</Button>
            </div>
          ))}
        </dl>
        </div>
        <Button className="add-button" isPrimary onClick={addItem}>{__('Add Item', 'edge-expansion')}</Button>
      </div>
    </Fragment>
  );
};

export default Edit;