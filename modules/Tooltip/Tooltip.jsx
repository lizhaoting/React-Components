import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import * as func from '../utils/func';
import { tooltips } from '../constants/enumtooltip';
import style from './Tooltip.css';

const Tooltip = ({ effect, place, id }) =>
  <ReactTooltip effect={effect} place={place} class={style.container} id={id} />;

Tooltip.propTypes = {
  effect: PropTypes.string,
  place: PropTypes.string,
  id: PropTypes.string,
};

Tooltip.rebuild = func.onceEachTick(ReactTooltip.rebuild);
Tooltip.show = ReactTooltip.show;
/**
 * should only fire hide once, in each time tick.
 * As multiple hide will not have any extra effects, but rather slow down the system.
 *
 * NOTICE: parameter is NOT accepted yet. If you need to pass in parameter, use ReactTooltip.hide
 * at the moment, or change this API.
 *
 * @todo
 * change this API to accept parameter. That means, hide should only fire once in each time tick,
 * when param passed in is the same.
 */
Tooltip.hide = func.onceEachTick(ReactTooltip.hide);

Tooltip.types = tooltips;

export default Tooltip;
