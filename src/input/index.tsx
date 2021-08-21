import { ReactUnity } from '@reactunity/renderer';
import { UGUIElements } from '@reactunity/renderer/ugui';
import clsx from 'clsx';
import React, { forwardRef, ReactNode, useImperativeHandle, useRef } from 'react';
import style from './index.module.scss';

type ViewEl = UGUIElements['view'];

export interface InputFieldProps extends ViewEl {
  children: ReactNode;
  placeholder?: ReactNode;
  className?: string;
  float?: 'always' | 'never' | 'auto';
}

export interface InputFieldRef {
  setEmpty: (empty: boolean) => void;
}

export const InputField = forwardRef<InputFieldRef, InputFieldProps>(
  function InputField({ children, float = 'auto', placeholder, className, ...other }, ref) {
    const hostRef = useRef<ReactUnity.UGUI.ContainerComponent>();

    useImperativeHandle(ref, () => ({
      setEmpty: (empty: boolean) => {
        hostRef.current?.ClassList.Toggle(style.float, !empty);
        hostRef.current?.ClassList.Toggle('float', !empty);
      },
    }), [hostRef]);

    return <view name="<InputField>" {...other} ref={hostRef}
      className={clsx(style.host, 'mat-input-field', className, style['float-' + (float || 'auto')], `float-${float || 'auto'}`)}>
      <view className={clsx(style.content, 'mat-input-content')}>
        {children}
      </view>

      <view className={clsx(style.inputFrame, 'mat-input-frame')}></view>

      <view className={clsx(style.placeholder, 'mat-input-placeholder')}>
        <view className={clsx(style.placeholderGhost, 'mat-input-placeholder-ghost')}>{placeholder}</view>
        <view className={clsx(style.placeholderContent, 'mat-input-placeholder-content')}>
          <view className={clsx(style.placeholderText, 'mat-input-placeholder-text')}>
            {placeholder}
          </view>
        </view>
      </view>
    </view >;
  });
