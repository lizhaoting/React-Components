import React, { PropTypes as T } from 'react';
import ReactDemo, { props as P } from 'react-demo';
import Button from '../modules/Button/Button';
import ButtonProgress from '../modules/ButtonProgress/ButtonProgress';
import IconSVG from '../modules/IconSVG/IconSVG';
import ButtonBar from '../modules/Button/ButtonBar';
import Checkbox from '../modules/Checkbox/Checkbox';
import CheckboxList from '../modules/Checkbox/CheckboxList';
import DatePicker from '../modules/DatePicker/DatePicker';
import Icon from '../modules/Icon/Icon';
import { icons as iconTypes } from '../modules/constants/enums';
import Input from '../modules/Input/Input';
import IconInput from '../modules/Input/IconInput';
import PrependInput from '../modules/Input/PrependInput';
import Modal from '../modules/Modal/Modal';
import RadioButton from '../modules/RadioButton/RadioButton';
import Resizer from '../modules/Resizer/Resizer';
import ResizeContainer from '../modules/Resizer/ResizeContainer';
import Select from '../modules/Select/Select';
import Switch from '../modules/Switch/Switch';
import TextArea from '../modules/TextArea/TextArea';
import Tooltip from '../modules/Tooltip/Tooltip';
import Tree from '../modules/Tree/Tree';
import TreeNode from '../modules/Tree/TreeNode';
import PopupBubble from '../modules/PopupBubble/PopupBubble';
import Rating from '../modules/Rating/Rating';
import Table from '../modules/Table/Table';
import Column from '../modules/Table/Column';
import Tab from '../modules/Tab/Tab';
import Label from '../modules/Label/Label';
import CornerMark from '../modules/CornerMark/CornerMark';
import Menu from '../modules/Menu/Menu';
import Search from '../modules/Search/Search';
import Section from '../modules/Section/Section';
import Condition from '../modules/Condition/Condition';
import Tags from '../modules/Tag/Tags';
import FileUpload from '../modules/Upload/Upload';
import PopupModal from '../modules/PopupModal/PopupModal';
import MultiInput from '../modules/MultiInput/MultiInput';

// Just a helper component
const Description = React.createClass({

  propTypes: {
    children: T.node.isRequired,
  },

  render() {
    return (<p style={{
      padding: 0,
      margin: '40px 0 10px',
      fontFamily: 'sans-serif',
      fontSize: 13,
    }}>
      {this.props.children}
    </p>);
  },

});

const Demo = () =>
  <div>
    <Description>
      PopupModal example .
    </Description>
    <ReactDemo
      target={PopupModal}
      props={{
        ifShow: P.bool(false),
        children: P.string(''),
      }}
    />
    <Description>
      MultiInput
    </Description>
    <ReactDemo
      target={MultiInput}
      props={{
        title: P.string('Contact'),
        data: P.json([{ name: 'Name', value: 'angus', onChanged: P.callback.log(() => 'click') },
        { name: 'Email', value: 'angus@comm100.com', onChanged: P.callback.log(() => 'click') },
        { name: 'Age', value: '29', onChanged: P.callback.log(() => 'click') },
        { name: 'Address', value: '湖南省长沙市岳麓区梅溪湖街道', onChanged: P.callback.log(() => 'click') }]),
      }}
    />

    <Description>
      FileUpload example .
    </Description>
    <ReactDemo
      target={FileUpload}
      props={{}}
    />
    <Description>
      Tags example .
    </Description>
    <ReactDemo
      target={Tags}
      props={{
        tags: P.json([]),
        selected: P.string('1'),
        removeTag: P.callback.log(() => 'removeTag'),
        onManageTags: P.callback.log(() => 'onManageTags'),
      }}
    />

    <Description>
      Condition example .
    </Description>
    <ReactDemo
      target={Condition}
      props={{
        operateTitle: P.string('Add Condition'),
        lstResult: P.json([{ fieldId: 9, matchType: 5, value: 'angus', index: 1, showDatePicker: false }]),
        lstSource: P.json([{
          id: 1,
          dataType: 4,
          name: 'Source',
          options: [
            {
              fieldId: 1,
              name: 'Facebook Message',
              value: '1',
              index: 1,
            },
            {
              fieldId: 1,
              name: 'Facebook Visitor Post',
              value: '2',
              index: 2,
            },
            {
              fieldId: 1,
              name: 'Facebook Wall Post',
              value: '3',
              index: 3,
            },
            {
              fieldId: 1,
              name: 'Twitter Tweet',
              value: '4',
              index: 4,
            },
            {
              fieldId: 1,
              name: 'Twitter Direct Message',
              value: '5',
              index: 5,
            },
          ],
        }, {
          id: 14,
          dataType: 3,
          name: 'Last Message Sent',
          options: [
            {
              fieldId: 14,
              name: 'Today',
              value: '@Today',
              index: 0,
            },
            {
              fieldId: 14,
              name: 'Yesterday',
              value: '@Yesterday',
              index: 0,
            },
            {
              fieldId: 14,
              name: '7 Days Ago',
              value: '@7 Days Ago',
              index: 0,
            },
            {
              fieldId: 14,
              name: '30 Days Ago',
              value: '@30 Days Ago',
              index: 0,
            },
            {
              fieldId: 14,
              name: 'Custom',
              value: '',
              index: 0,
            },
          ],
        }, {
          id: 17,
          dataType: 2,
          name: 'Time Since Last Message',
          options: [],
        }, {
          id: 9,
          dataType: 1,
          name: 'Last Message Sent by',
          options: [],
        }]),
      }}
    />

    <Description>
      Label example.
    </Description>
    <ReactDemo
      target={Label}
      props={{
        text: P.string('Label demo one'),
        ifMultiLine: P.bool(false),
        ifSuperLink: P.bool(true),
        href: P.string('http://www.baidu.com'),
        target: P.string('_blank'),
        onClick: P.callback.log(() => 'onClick'),
      }}
    />

    <Description>
      Label advance example.
    </Description>
    <ReactDemo
      props={{
        text: P.string('Label demo one'),
        ifMultiLine: P.bool(false),
        ifSuperLink: P.bool(true),
        href: P.string('http://www.baidu.com'),
        target: P.string('_blank'),
        onClick: P.callback.log(() => 'onClick'),
      }}
    >
      {(props, update) => (
        <Label
          text={props.text}
          ifMultiLine={props.ifMultiLine}
          ifSuperLink={props.ifSuperLink}
          href={props.href}
          target={props.target}
          onClick={props.onClick}
          icon={<Icon
            type={iconTypes.conversationExternal}
            size={16}
            style={{ marginTop: '2px' }}
          />}
        />
      )}
    </ReactDemo>

    <Description>
      Corner Mark example .
    </Description>
    <ReactDemo
      target={CornerMark}
      props={{
        num: P.number(12),
        className: P.string('customcss'),
        ifShowSimple: P.bool(true),
      }}
    />


    <Description>
      Section example.
    </Description>
    <ReactDemo>
      {() => (
        <Section>
          <div style={{ width: '140%', height: '140%' }}>
            test
          </div>
        </Section>
      )}
    </ReactDemo>
    <Description>
      Search example.
    </Description>
    <ReactDemo
      target={Search}
      props={{
        id: P.number(1),
        searchValue: P.string('hello'),
        placeHolder: P.string('placeHolder'),
        disabled: P.bool(false),
        searching: P.bool(false),
        onSearch: P.callback.log(() => 'onClick'),
        onReset: P.callback.log(() => 'onClick'),
        size: P.choices(['large', 'default', 'small']),
        htmlType: P.choices(['submit', 'button', 'reset']),
      }}
    />
    <Description>
      Button example.
    </Description>
    <ReactDemo
      target={Button}
      props={{
        type: P.choices(['primary', 'default', 'gray', 'noborder']),
        text: P.string('Click Me!'),
        disabled: P.bool(false),
        loading: P.bool(false),
        onClick: P.callback.log(() => 'onClick'),
        iconPosition: P.choices(['left', 'right']),
        size: P.choices(['large', 'default', 'small']),
        htmlType: P.choices(['submit', 'button', 'reset']),
      }}
    />

    <Description>
      ButtonProgress example.
    </Description>
    <ReactDemo
      target={ButtonProgress}
      props={{
        success: P.bool(false),
        failed: P.bool(false),
      }}
    />

    <Description>
      Input example.
    </Description>
    <ReactDemo
      target={Input}
      props={{
        value: P.string('aaa'),
        animationEffect: P.choices(['', 'input--effect01']),
        meta: P.json({}),
      }}
    />

    <Description>
      SVG example.
    </Description>
    <ReactDemo
      target={IconSVG}
      props={{
        disabled: P.bool(false),
        type: P.choices(['rating', 'sendfile', 'videochat', 'voicechat', 'sendemail']),
        onClick: P.callback.log(() => 'onClick'),
      }}
    />

    <Description>
      Popup Bubble example.
    </Description>
    <ReactDemo
      target={PopupBubble}
      props={{
        children: P.string('Sure you want to leave the chat and rate the service?'),
        transformOrigin: P.string('262px -16px'),
        ifShow: P.bool(false),
      }}
    />
    <Description>
      CheckboxList example.
    </Description>
    <ReactDemo
      target={CheckboxList}
      props={{
        align: P.choices(['horizontal', 'vertical']),
        options: P.json([
          { id: 1, text: 'option1' },
          { id: 2, text: 'option2' },
          { id: 3, text: 'option3' },
          { id: 4, text: 'option4' },
        ]),
        input: P.shape({
          value: P.string('1'),
          onChange: P.callback.log(),
        }),
        disabled: P.bool(false),
      }}
    />

    <Description>
      RadioButton example.
    </Description>
    <ReactDemo
      target={RadioButton}
      props={{
        name: P.string('radioButton'),
        radioOption: P.json([
          { value: '1', text: 'option1', checked: true },
          { value: '2', text: 'option2' },
          { value: '3', text: 'option3' },
          { value: '4', text: 'option4' },
        ]),
        horizontal: P.bool(false),
        handleChange: P.callback.log(() => 'onClick'),
        disabled: P.bool(false),
      }}
    />

    <Description>
      Select example.
    </Description>
    <ReactDemo
      target={Select}
      props={{
        options: P.json([
          { text: 'a', value: 'aaa', icon: Icon.types.ArticleDraft, tag: '(Online)', tagTheme: '#4D9540' },
          { text: 'b', value: 'bbb', icon: Icon.types.ArticlePublic, tag: '(Online)', tagTheme: '#4D9540' },
          { text: 'c', value: 'ccc', icon: Icon.types.ArticleDraft, tag: '(Online)', tagTheme: '#4D9540' },
          { text: 'd', value: 'ddd', icon: Icon.types.ArticlePublic, tag: '(Away)', tagTheme: '#FE8B33' },
          { text: 'e', value: 'eee', icon: Icon.types.ArticleDraft, tag: '(Away)', tagTheme: '#FE8B33' },
        ]),
        iconSize: P.number(12),
        input: P.shape({
          value: P.string('aaa'),
          onChange: P.callback.log(),
        }),
      }}
    />

    <Description>
      Rating example.
    </Description>
    <ReactDemo
      target={Rating}
      props={{
        rateVal: P.number(0),
        rateItems: P.json([1, 2, 3, 4, 5]),
        ifCanHalfRate: P.bool(false),
      }}
    />

    <Description>
      Icon example.
    </Description>
    <ReactDemo
      target={Icon}
      props={{
        default: P.bool(true),
        type: P.string(Icon.types.add),
        color: P.string('#000000'),
        disabled: P.bool(false),
        size: P.string('large'),
        hoverScale: P.bool(true),
        hoverColor: P.string('#ff0000'),
      }}
    />

    <Description>
      Tree example.
    </Description>
    <ReactDemo
      props={{
        checkable: P.bool(false),
        defaultExpandAll: P.bool(false),
        defaultCheckedKeys: P.json(['0-0-0-0']),
        onSelect: P.callback.log(),
        onDoubleClick: P.callback.log(),
        onCheck: P.callback.log(),
        paddingLeft: P.number(100),
      }}
    >
      {props => <Tree>
        <TreeNode
          title="parent 1" onDragStart={e => console.log(e)}
          onDragOver={e => console.log(e)}
          onDrop={e => console.log(e)}
        >
          <TreeNode title="Leaf 1">
            {true && null}
          </TreeNode>
          <TreeNode title="Leaf 2" isLeaf />
        </TreeNode>
        <TreeNode title="parent 2" />
      </Tree>}
    </ReactDemo>

    <Description>
      Table example.
    </Description>
    <ReactDemo
      props={{
        data: P.json([
          { text: 'a', value: 'aaa' },
          { text: 'b', value: 'bbb' },
          { text: 'c', value: 'ccc' },
          { text: 'd', value: 'ddd' },
          { text: 'e', value: 'eee' },
        ]),
        ifPaging: P.bool(false),
        sortCol: 'text',
        sortAsc: P.bool(true),
        width: P.number(300),
      }}
    >
      {props => (<Table
        data={props.data}
        ifPaging={props.ifPaging}
        sortCol={'modifiedTime'}
        width={props.width}
      >
        <Column
          name="Text"
          dataKey="text"
          width={30}
          td={row => row.tdValue}
        />
        <Column
          name="Value"
          dataKey="value"
          width={30}
          td={row => row.tdValue}
        />
        <Column
          name="Upper Case"
          dataKey="value"
          width={30}
          td={(row) => row.tdValue.toUpperCase()}
        />
      </Table>)
      }
    </ReactDemo>

    <Description>Tab example</Description>
    <ReactDemo
      props={{
        tabs: P.json([
          {
            key: 'info',
            text: 'Info',
            icon: {
              type: iconTypes.info,
              hoverColor: '#329fd9',
            },
          }, {
            key: 'canned',
            text: 'Canned',
            icon: {
              type: iconTypes.canned,
              hoverColor: '#fcb603',
            },
          }, {
            key: 'navigation',
            text: 'Navigation',
            icon: {
              type: iconTypes.navigation,
              hoverColor: '#7ebd3a',
            },
          }, {
            key: 'history',
            text: 'History',
            icon: {
              type: iconTypes.history,
              hoverColor: '#f05030',
            },
          }, {
            key: 'wrapup',
            text: 'Wrap-up',
            icon: {
              type: iconTypes.wrapup,
              hoverColor: '#7ac2b7',
            },
          }, {
            key: 'support',
            text: 'Support',
            icon: {
              type: iconTypes.attachticket,
              hoverColor: '#ff4d4d',
            },
          }, {
            key: 'facebook',
            text: 'Facebook',
            icon: {
              type: iconTypes.facebook,
              hoverColor: '#3b579d',
            },
          }, {
            key: 'salesforce',
            text: 'Salesforce',
            icon: {
              type: iconTypes.salesforce,
              hoverColor: '#59b5e6',
            },
          }, {
            key: 'customTab',
            text: 'Custom Tab',
            icon: {
              hoverColor: '#59b5e6',
              url: 'http://kb.comm100.com/kbadmin/images/api.png',
            },
          }, {
            key: 'smileTab',
            text: 'Smile',
            icon: {
              hoverColor: '#59b5e6',
              url: 'http://kb.comm100.com/kbadmin/images/smiley.svg',
            },
          }, {
            key: 'jpgTab',
            text: 'Jpg',
            icon: {
              hoverColor: '#59b5e6',
              url: 'http://kb.comm100.com/kbadmin/images/api.jpg',
            },
          }, {
            key: 'gifTab',
            text: 'Gif',
            icon: {
              hoverColor: '#59b5e6',
              url: 'http://kb.comm100.com/kbadmin/images/api.gif',
            },
          }, {
            key: 'bmpTab',
            text: 'Bmp',
            icon: {
              hoverColor: '#59b5e6',
              url: 'http://kb.comm100.com/kbadmin/images/api.bmp',
            },
          },
        ]),
        selected: P.string('info'),
        draggable: P.bool(true),
        width: P.number(300),
      }}
    >
      {(props, update) => (
        <Tab
          tabs={props.tabs}
          selected={props.selected}
          draggable={props.draggable}
          width={props.width}
          onSelectedChange={(selectedKey) => {
            update({
              selected: selectedKey,
            });
          }}
          onReorder={(items) => {
            update({
              tabs: items,
            });
          }}
        />)}
    </ReactDemo>
  </div >;

export default Demo;
