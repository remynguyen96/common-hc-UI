/**
 * Home Credit (https://www.homecredit.vn/)
 *
 * Copyright © 2018-present HomeCredit, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { string, date, boolean, object } from 'yup';
import { pick, head } from 'lodash';

const REQUIRED_FIELD_MESSAGE = 'Thông tin này là bắt buộc!';
const INVALID_FIELD_MESSAGE = 'Thông tin này không hợp lệ';
const IS_VALID_STRING = /^([^0-9!@#$%^&*(){}[\]~_+=\-•£€¥¢®¿§×¶°¬¦|¿¡÷;°.":;<>?,]*)$/;
const IS_HAS_NUMBER = /^[0-9]+$/;

const validationSchema = {
  firstName: string()
    .required(REQUIRED_FIELD_MESSAGE)
    .matches(IS_VALID_STRING, INVALID_FIELD_MESSAGE),
  middleName: string()
    .required(REQUIRED_FIELD_MESSAGE)
    .matches(IS_VALID_STRING, INVALID_FIELD_MESSAGE),
  lastName: string()
    .required(REQUIRED_FIELD_MESSAGE)
    .matches(IS_VALID_STRING, INVALID_FIELD_MESSAGE),
  dayOfBirth: date()
    .nullable()
    .required(REQUIRED_FIELD_MESSAGE),
  imageUrl: string().required(REQUIRED_FIELD_MESSAGE),
  idCard: string()
    .required(REQUIRED_FIELD_MESSAGE)
    .matches(IS_HAS_NUMBER, INVALID_FIELD_MESSAGE)
    .test(
      'len',
      INVALID_FIELD_MESSAGE,
      val => val && (val.length === 9 || val.length === 12),
    ),
  monthlyIncome: string().required(REQUIRED_FIELD_MESSAGE),
  monthlyPayment: string().required(REQUIRED_FIELD_MESSAGE),
  identificationType: string(),
  phoneNumber: string()
    .required(REQUIRED_FIELD_MESSAGE)
    .matches(IS_HAS_NUMBER, INVALID_FIELD_MESSAGE)
    .test(
      'len',
      'Số điện thoại phải bắt đầu bằng số 0',
      val => val && head(val) === '0',
    )
    .test(
      'len',
      'Số điện thoại phải bao gồm 10 số',
      val => val && val.length === 10,
    ),
  drivingLicence: string().when('identificationType', {
    is: val => val === 'drivingLicence',
    then: string().required(REQUIRED_FIELD_MESSAGE),
  }),
  familyBook: string().when('identificationType', {
    is: val => val === 'familyBook',
    then: string().required(REQUIRED_FIELD_MESSAGE),
  }),
  email: string().email('Sai định dạng email'),
  acceptedTerm: boolean().oneOf([true], 'Vui lòng đồng ý để tiếp tục'),
  otp: string().required('Vui lòng nhập 6 hoặc 8 chư số OTP'),
};

const extractFields = fields => pick(validationSchema, fields);
const getValidationSchema = values => object().shape(extractFields(values));

export { validationSchema, getValidationSchema, extractFields };
