/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { darken } from 'polished';
import React from 'react';
import styled from 'styled-components';
import {
  InfraFormatter,
  InfraWaffleMapRuleOperator,
  InfraWaffleMapStepLegend,
  InfraWaffleMapStepRule,
} from '../../lib/lib';

const OPERATORS = {
  [InfraWaffleMapRuleOperator.gte]: '>=',
  [InfraWaffleMapRuleOperator.gt]: '>',
  [InfraWaffleMapRuleOperator.lte]: '<=',
  [InfraWaffleMapRuleOperator.lt]: '<',
  [InfraWaffleMapRuleOperator.eq]: '=',
};

interface Props {
  legend: InfraWaffleMapStepLegend;
  formatter: InfraFormatter;
}

const createStep = (formatter: InfraFormatter) => (rule: InfraWaffleMapStepRule, index: number) => {
  const label =
    rule.label != null ? rule.label : `${OPERATORS[rule.operator]} ${formatter(rule.value)}`;
  const squareStyle = { backgroundColor: darken(0.4, rule.color) };
  const squareInnerStyle = { backgroundColor: rule.color };
  return (
    <StepContainer key={`legend-step-${index}`}>
      <StepSquare style={squareStyle}>
        <StepSquareInner style={squareInnerStyle} />
      </StepSquare>
      <StepLabel>{label}</StepLabel>
    </StepContainer>
  );
};

export const StepLegend: React.SFC<Props> = ({ legend, formatter }) => {
  return <StepLegendContainer>{legend.rules.map(createStep(formatter))}</StepLegendContainer>;
};

const StepLegendContainer = styled.div`
  display: flex;
  padding: 10px;
`;

const StepContainer = styled.div`
  display: flex;
  margin-right: 20px
  align-items: center;
`;

const StepSquare = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  flex: 0 0 auto;
  margin-right: 5px;
  border-radius: 3px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
`;

const StepSquareInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 2px;
  border-radius: 3px;
`;

const StepLabel = styled.div`
  font-size: 12px;
`;