import React from 'react';
import JSONInput from 'react-json-editor-ajrm/';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const locale = require('react-json-editor-ajrm/locale/en');

export type JsonOutput = {
  jsonObject: unknown;
  json: string;
};

export class JsonEditor extends React.Component<{
  callBack: (value: JsonOutput) => void;
  json: unknown;
  hidden: boolean;
}> {
  override render() {
    return (
      <div
        style={{
          width: this.props.hidden ? '0' : '33vw',
          overflow: 'hidden',
          height: '100%',
        }}
      >
        <JSONInput
          onBlur={this.props.callBack}
          placeholder={this.props.json}
          locale={locale}
          height="100%"
          width="33vw"
          style={{
            body: {
              height: '100%',
              fontSize: '16px',
            },
          }}
        />
      </div>
    );
  }
}
