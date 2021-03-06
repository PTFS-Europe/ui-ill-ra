import React from 'react';

import { FormattedMessage } from 'react-intl';

import { Field } from 'react-final-form';

import {
  Col,
  Row,
  TextField,
  Select,
  Datepicker
} from '@folio/stripes/components';

import { PUBLICATION_TYPE } from '@ptfs-europe/ill-components';

const SubmissionBibinfoForm = () => {
  return (
    <Row>
      <Col xs={6} md={3}>
        <Field
          component={TextField}
          fullWidth
          id="Publisher"
          label={<FormattedMessage id="ui-ill-components.iso18626.PublicationInfo.Publisher" />}
          name="submissionMetadata.PublicationInfo.Publisher"
          validateFields={[]}
        />
      </Col>
      <Col xs={6} md={3}>
        <Field
          component={Select}
          fullWidth
          label={<FormattedMessage id="ui-ill-components.iso18626.PublicationInfo.PublicationType" />}
          name="submissionMetadata.PublicationInfo.PublicationType"
          placeholder=" "
          validateFields={[]}
        >
          {PUBLICATION_TYPE.map((pubType) => (
            <FormattedMessage
              id={`ui-ill-components.iso18626.PublicationInfo.PublicationType.${pubType}`}
              key={pubType}
            >
              {(message) => <option value={pubType}>{message}</option>}
            </FormattedMessage>
          ))}
        </Field>
      </Col>
      <Col xs={6} md={3}>
        <Field
          component={Datepicker}
          fullWidth
          label={<FormattedMessage id="ui-ill-components.iso18626.PublicationInfo.PublicationDate" />}
          name="submissionMetadata.PublicationInfo.PublicationDate"
          validateFields={[]}
        />
      </Col>
      <Col xs={6} md={3}>
        <Field
          component={TextField}
          fullWidth
          id="PlaceOfPublication"
          label={<FormattedMessage id="ui-ill-components.iso18626.PublicationInfo.PlaceOfPublication" />}
          name="submissionMetadata.PublicationInfo.PlaceOfPublication"
          validateFields={[]}
        />
      </Col>
    </Row>
  );
};

export default SubmissionBibinfoForm;
