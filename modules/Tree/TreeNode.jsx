import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import classnames from 'classnames';
import Animate from 'rc-animate';
import Checkbox from '../Checkbox/Checkbox';
import Icon from '../Icon/Icon';
import style from './Tree.css';
import { toArray } from './util';
/**
 * TreeNode
 */
class TreeNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draggable: false,
    }
    this.checkClick = false;
    this.onCheck = this.onCheck.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onExpand = this.onExpand.bind(this);
  }
  componentDidMount() {
    if (!this.props.root._treeNodeInstances) {
      this.props.root._treeNodeInstances = [];
    }
    this.props.root._treeNodeInstances.push(this);
  }
  onCheck() {
    this.checkClick = true;
    this.props.root.onCheck(this);
  }
  onSelect(e) {
    e.nativeEvent.preventDefault();
    e.nativeEvent.stopPropagation();
    this.props.root.onSelect(this.props.data);
  }
  onExpand() {
    this.props.root.onExpand(this);
  }
  // keyboard event support
  onKeyDown(e) {
    e.preventDefault();
  }
  renderChildren(props) {
    const renderFirst = this.renderFirst;
    this.renderFirst = 1;
    let transitionAppear = true;
    if (!renderFirst && props.expanded) {
      transitionAppear = false;
    }
    const children = props.children ? toArray(props.children) : props.children;
    let newChildren = children;
    if (children &&
      (Array.isArray(children) &&
        children.every((item) => item && item.type && item.type.isTreeNode) ||
        (children.type && children.type.isTreeNode))) {
      const animProps = {};
      if (props.openTransitionName) {
        animProps.transitionName = props.openTransitionName;
      } else if (typeof props.openAnimation === 'object') {
        animProps.animation = _.assign({}, props.openAnimation);
        if (!transitionAppear) {
          delete animProps.animation.appear;
        }
      }
      newChildren = (
        <Animate
          {...animProps}
          showProp="data-expanded"
          transitionAppear={transitionAppear}
          component=""
        >
          {!props.expanded ? null : <ul
            className={classnames(style['vm-tree-child-tree'],
            props.expanded && style['vm-tree-child-tree-open'])}
            data-expanded={props.expanded}
          >
            {React.Children.map(children, (item, index) =>
               props.root.renderTreeNode(item, index, props.pos)
            , props.root)}
          </ul>}
        </Animate>
      );
    }
    return newChildren;
  }
  render() {
    const props = this.props;
    const tip = {};
    const content = props.content;
    let canRenderSwitcher = true;
    let newChildren = this.renderChildren(props);
    if (!newChildren || newChildren === props.children) {
      // content = newChildren;
      newChildren = null;
      if (!newChildren || props.isLeaf) {
        canRenderSwitcher = false;
      }
    }
    // const title = <span className={style['vm-tree-title']}>{content}</span>;
    const paddingLeft = props.paddingLeft + 15 * (props.pos.split('-').length - 2) + (canRenderSwitcher ? 0 : 25);
    return (
      <li draggable={this.state.draggable}
        onDragStart={props.dragStart}
        onDragEnter={props.dragEnter}
        onDragOver={props.dragOver}
        onDrop={props.drop}
        onDragEnd={props.dragEnd}
        className={classnames(props.className,
          !canRenderSwitcher && style['vm-tree-leaf'],
          props.disabled && style['vm-tree-treenode-disabled'],
          props.dragging && style['dragging'])}>
        <div
          className={classnames(style['vm-tree-itemWrapper'], props.selected && style['vm-tree-selected'],)}
          style={{ paddingLeft }}
          tabIndex={-1}
          onClick={(e) => {this.onSelect(e); }}
        >
          {canRenderSwitcher &&
            <Icon className={style['vm-tree-node-expand-icon']} type={props.expanded ? Icon.types.arrowDown : Icon.types.arrowRight} onClick={this.onExpand} />
          }
          {props.checkable &&
            <Checkbox text="" checked={props.checked} onChange={this.onCheck} />
          }
          {
            props.isShowIcon
              ?(<Icon className={style['vm-tree-node-folder-icon']}
                type={(props.isLeaf ? props.leafIcon
                  : (props.expanded ? props.expandedIcon : props.defaultIcon))} />)
              : null
          }
          {
            props.title
          }
          {
            props.draggable &&
              <div className={style.sortableWrapper} >
                <Icon type={Icon.types.order}
                  onMouseOver={() => this.setState({ draggable: true })}
                  onMouseOut={() => this.setState({ draggable: false })} />
              </div>
          }
          {content}
        </div>
        {newChildren}
      </li>
    );
  }
}

TreeNode.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  data: PropTypes.object,
  disabled: PropTypes.bool,
  expanded: PropTypes.bool,
  isLeaf: PropTypes.bool,
  root: PropTypes.object,
  expandedIcon: PropTypes.string,
  defaultIcon: PropTypes.string,
  leafIcon: PropTypes.string,
  paddingLeft: PropTypes.number,
};

TreeNode.defaultProps = {
  paddingLeft: 0,
  expandedIcon: Icon.types.folderOpen,
  defaultIcon: Icon.types.folder,
  leafIcon: Icon.types.folder,
};

TreeNode.isTreeNode = 1;

export default TreeNode;
