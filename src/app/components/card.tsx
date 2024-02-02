/*
 * Note: This components are not used in the project currently.
 * but it is still here for future use.
 */

import { useState } from "react";
import { MdElevation, MdRippleEffect } from "../util/md3";
import styles from "./styles/card.module.css";
import classNames from "classnames/bind";

export const MdElevatedCard = (props: {
  children: React.ReactNode;
  noElevation?: boolean;
  state?: "enabled" | "disabled" | "focused" | "dragged";
  className?: string;
}) => {
  const cx = classNames.bind(styles);
  const [isHover, setIsHover] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div
      onMouseOver={() => {
        setIsHover(true);
      }}
      onMouseOut={() => {
        setIsHover(false);
      }}
      onMouseDown={() => {
        setIsPressed(true);
      }}
      onMouseUp={() => {
        setIsPressed(false);
      }}
      className={
        cx({
          card: true,
          elevated: true,
          hovered: !isPressed && isHover && !props.noElevation,
          pressed: isHover && isPressed && !props.noElevation,
          disabled: props.state === "disabled",
          focused: props.state === "focused",
          dragged: props.state === "dragged",
        }) +
        ` ` +
        props.className
      }
    >
      <MdElevation />
      {props.state === "disabled" || props.noElevation ? null : (
        <MdRippleEffect />
      )}
      {props.children}
    </div>
  );
};

export const MdFilledCard = (props: {
  children: React.ReactNode;
  noElevation?: boolean;
  state?: "enabled" | "disabled" | "focused" | "dragged";
  className?: string;
}) => {
  const cx = classNames.bind(styles);
  const [isHover, setIsHover] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div
      onMouseOver={() => {
        setIsHover(true);
      }}
      onMouseOut={() => {
        setIsHover(false);
      }}
      onMouseDown={() => {
        setIsPressed(true);
      }}
      onMouseUp={() => {
        setIsPressed(false);
      }}
      className={
        cx({
          card: true,
          filled: true,
          hovered: !isPressed && isHover && !props.noElevation,
          pressed: isHover && isPressed && !props.noElevation,
          disabled: props.state === "disabled",
          focused: props.state === "focused",
          dragged: props.state === "dragged",
        }) +
        ` ` +
        props.className
      }
    >
      <MdElevation />
      {props.state === "disabled" || props.noElevation ? null : (
        <MdRippleEffect />
      )}
      {props.children}
    </div>
  );
};

export const MdOutlinedCard = (props: {
  children: React.ReactNode;
  noElevation?: boolean;
  state?: "enabled" | "disabled" | "focused" | "dragged";
  className?: string;
}) => {
  const cx = classNames.bind(styles);
  const [isHover, setIsHover] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div
      onMouseOver={() => {
        setIsHover(true);
      }}
      onMouseOut={() => {
        setIsHover(false);
      }}
      onMouseDown={() => {
        setIsPressed(true);
      }}
      onMouseUp={() => {
        setIsPressed(false);
      }}
      className={
        cx({
          card: true,
          outlined: true,
          hovered: !isPressed && isHover && !props.noElevation,
          pressed: isHover && isPressed && !props.noElevation,
          disabled: props.state === "disabled",
          focused: props.state === "focused",
          dragged: props.state === "dragged",
        }) +
        ` ` +
        props.className
      }
    >
      <MdElevation />
      {props.state === "disabled" || props.noElevation ? null : (
        <MdRippleEffect />
      )}
      {props.children}
    </div>
  );
};
