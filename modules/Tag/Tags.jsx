import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Icon } from '../Icon/Icon';
import style from './tags.css';
import TagModal from './TagModal';

const getTags = (tags, selected) => tags.map((tag) => {
  tag.selected = selected.find(id => id === tag.id) !== undefined;
  return tag;
});

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: 'none',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextState, this.state) ||
      !_.isEqual(nextProps, this.props);
  }

  render() {
    const props = this.props;
    const tags = getTags(props.tags, props.selected);
    const tagItem = tag => (
      <div key={`item-${tag.id}`} className={style.tagItem}>
        <div className={style.tagName}>{tag.name}</div>
        <Icon type={Icon.types.delete} size={8} onClick={() => { this.props.removeTag(tag); }} />
      </div>);

    return (
      <div>
        <div className={style.title}>{'Tags'}
          <a className={style.manageLink} onClick={() => { this.setState({ action: 'manage' }); }}>{'Manage'}</a>
        </div>
        <div className={style.tags}>
          {props.tags.filter(tag => props.selected.indexOf(tag.id) !== -1)
            .map(tag => tagItem(tag))
          }
          <a onClick={() => { this.setState({ action: 'add' }); }} >{'+ Add'}</a>
        </div>
        {(this.state.action === 'add' || this.state.action === 'manage') &&
          <TagModal
            tags={tags}
            ifAdd={this.state.action === 'add'}
            selected={props.selected}
            close={() => { this.setState({ action: 'none' }); }}
            onManageTags={props.onManageTags}
          />}
      </div>
    );
  }
}

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selected: PropTypes.arrayOf(PropTypes.number).isRequired,
  removeTag: PropTypes.func.isRequired,
  onManageTags: PropTypes.func.isRequired,
};

export default Tags;
