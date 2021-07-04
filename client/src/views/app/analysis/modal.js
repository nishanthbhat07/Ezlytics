import React from "react";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
  ModalFooter,
} from "reactstrap";

const ChooseColsAndAnalysisModal = ({
  isOpen,
  showModal,
  columns,
  numerical_cols,
  categorical_cols,
  analysisType,
  showCols,
  setShowCols,
  setAnalysisType,
  selectedCol,
  setSelectedCol,
  setSelectedCols,
  selectedCols1,
  selectedCols2,
  drawGraphs,
}) => {
  return (
    <Modal isOpen={isOpen} toggle={() => showModal()}>
      <ModalHeader toggle={() => showModal()}>
        Choose Columns for plotting charts
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="analysisType">Select</Label>
          <Input
            type="select"
            value={analysisType}
            name="select"
            onChange={(e) => {
              setAnalysisType(e.target.value);
              setShowCols(true);
            }}
          >
            <option>Select</option>
            <option>Univariate Analysis</option>
            <option>Bivariate Analysis</option>
          </Input>
        </FormGroup>
        {showCols && analysisType === "Univariate Analysis" ? (
          <FormGroup>
            <Label for="selectedCol">Select</Label>
            <Input
              type="select"
              value={selectedCol}
              onChange={(e) => setSelectedCol(e.target.value)}
              name="selectCol"
            >
              {columns.map((el) => {
                if (el !== "id") return <option key={el}>{el}</option>;
              })}
            </Input>
          </FormGroup>
        ) : showCols && analysisType === "Bivariate Analysis" ? (
          <>
            <FormGroup>
              <Label for="selectedCols1">Select from numerical Columns</Label>
              <Input
                type="select"
                value={selectedCols1}
                onChange={(e) => setSelectedCols(e)}
                name="selectedCols1"
              >
                {numerical_cols.map((el) => {
                  if (el !== "id") return <option key={el}>{el}</option>;
                })}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="selectedCols2">Select from categorical Columns</Label>
              <Input
                type="select"
                value={selectedCols2}
                onChange={(e) => setSelectedCols(e)}
                name="selectedCols2"
              >
                {categorical_cols.map((el) => {
                  if (el !== "id") return <option key={el}>{el}</option>;
                })}
              </Input>
            </FormGroup>
          </>
        ) : null}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => drawGraphs()}>
          Send
        </Button>{" "}
        <Button color="secondary" onClick={() => showModal()}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default ChooseColsAndAnalysisModal;
