import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import { Dialog, Classes } from "@blueprintjs/core";
import { isPermitted } from "pages/Applications/permissionHelpers";

const StyledDialog = styled(Dialog)<{ setMaxWidth?: boolean }>`
  && {
    border-radius: 0px;
    padding-bottom: 5px;
    background: ${props => props.theme.colors.modal.bg};
    width: 640px;

    & .bp3-dialog-header {
      padding: ${props => props.theme.spaces[4]}px;
      background: ${props => props.theme.colors.modal.bg};
      box-shadow: none;
      .bp3-icon {
        color: ${props => props.theme.colors.modal.iconColor};
      }
      .bp3-heading {
        color: ${props => props.theme.colors.modal.headerText};
        display: flex;
        justify-content: center;
        margin-top: 20px;
        font-size: 20px;
        line-height: 24px;
        font-weight: 500;
      }

      .bp3-button.bp3-minimal:hover {
        background-color: ${props => props.theme.colors.modal.bg};
      }
    }
    & .bp3-dialog-body {
      margin: ${props => props.theme.spaces[9]}px;
    }
    & .bp3-dialog-footer-actions {
      display: block;
    }
    ${props => props.setMaxWidth && `width: 100vh;`}
  }
`;

const TriggerWrapper = styled.div``;

type FormDialogComponentProps = {
  isOpen?: boolean;
  canOutsideClickClose?: boolean;
  orgId?: string;
  title: string;
  Form: any;
  trigger: ReactNode;
  permissionRequired?: string;
  permissions?: string[];
  setMaxWidth?: boolean;
  applicationId?: string;
};

export const FormDialogComponent = (props: FormDialogComponentProps) => {
  const [isOpen, setIsOpen] = useState(!!props.isOpen);

  const onClose = () => {
    setIsOpen(false);
  };

  const Form = props.Form;

  if (
    props.permissions &&
    props.permissionRequired &&
    !isPermitted(props.permissions, props.permissionRequired)
  )
    return null;

  return (
    <React.Fragment>
      <TriggerWrapper onClick={() => setIsOpen(true)}>
        {props.trigger}
      </TriggerWrapper>

      <StyledDialog
        canOutsideClickClose={!!props.canOutsideClickClose}
        canEscapeKeyClose={false}
        title={props.title}
        onClose={onClose}
        isOpen={isOpen}
        setMaxWidth={props.setMaxWidth}
      >
        <div className={Classes.DIALOG_BODY}>
          <Form
            onCancel={onClose}
            orgId={props.orgId}
            applicationId={props.applicationId}
          />
        </div>
      </StyledDialog>
    </React.Fragment>
  );
};

export default FormDialogComponent;
