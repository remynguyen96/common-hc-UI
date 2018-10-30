import { getValidationSchema, extractFields } from '../validations';

describe('utils/validations.js', () => {
  test('extractFields should return false invalid firstName', async () => {
    const { firstName } = extractFields('firstName');
    const isFirstName = await firstName.isValid('');
    expect(isFirstName).toBeFalsy();
  });

  test('extractFields should return true valid firstName', async () => {
    const { firstName } = extractFields('firstName');
    const isFirstName = await firstName.isValid('Remy');
    expect(isFirstName).toBeTruthy();
  });

  test('extractFields should return false invalid middleName', async () => {
    const { middleName } = extractFields('middleName');
    const isMiddleName = await middleName.isValid(111);
    expect(isMiddleName).toBeFalsy();
  });

  test('extractFields should return true valid middleName', async () => {
    const { middleName } = extractFields('middleName');
    const isMiddleName = await middleName.isValid('Ngoc');
    expect(isMiddleName).toBeTruthy();
  });

  test('extractFields should return false invalid lastName', async () => {
    const { lastName } = extractFields('lastName');
    const isLastName = await lastName.isValid('');
    expect(isLastName).toBeFalsy();
  });

  test('extractFields should return true valid lastName', async () => {
    const { lastName } = extractFields('lastName');
    const isLastName = await lastName.isValid('Nguyen');
    expect(isLastName).toBeTruthy();
  });

  test('extractFields should return false invalid dayOfBirth', async () => {
    const { dayOfBirth } = extractFields('dayOfBirth');
    const isDayOfBirth = await dayOfBirth.isValid(null);
    expect(isDayOfBirth).toBeFalsy();
  });

  test('extractFields should return true valid dayOfBirth', async () => {
    const { dayOfBirth } = extractFields('dayOfBirth');
    const isDayOfBirth = await dayOfBirth.isValid(new Date());
    expect(isDayOfBirth).toBeTruthy();
  });

  test('extractFields should return false invalid imageUrl', async () => {
    const { imageUrl } = extractFields('imageUrl');
    const isImageUrl = await imageUrl.isValid(null);
    expect(isImageUrl).toBeFalsy();
  });

  test('extractFields should return true valid imageUrl', async () => {
    const { imageUrl } = extractFields('imageUrl');
    const isImageUrl = await imageUrl.isValid('Image');
    expect(isImageUrl).toBeTruthy();
  });

  test('extractFields should return false invalid idCard', async () => {
    const { idCard } = extractFields('idCard');
    const isIdCardNumber = await idCard.isValid(123345);
    const isIdCardStr = await idCard.isValid('123345');
    expect(isIdCardNumber).toBeFalsy();
    expect(isIdCardStr).toBeFalsy();
  });

  test('extractFields should return true valid idCard', async () => {
    const { idCard } = extractFields('idCard');
    const isIdCardNumber = await idCard.isValid(123345678);
    const isIdCardStr = await idCard.isValid('123345678');
    expect(isIdCardNumber).toBeTruthy();
    expect(isIdCardStr).toBeTruthy();
  });

  test('extractFields should return false invalid monthlyIncome', async () => {
    const { monthlyIncome } = extractFields('monthlyIncome');
    const isMonthlyIncome = await monthlyIncome.isValid(null);
    expect(isMonthlyIncome).toBeFalsy();
  });

  test('extractFields should return true valid monthlyIncome', async () => {
    const { monthlyIncome } = extractFields('monthlyIncome');
    const isMonthlyIncome = await monthlyIncome.isValid('Income');
    expect(isMonthlyIncome).toBeTruthy();
  });

  test('extractFields should return false invalid monthlyPayment', async () => {
    const { monthlyPayment } = extractFields('monthlyPayment');
    const isMonthlyPayment = await monthlyPayment.isValid(null);
    expect(isMonthlyPayment).toBeFalsy();
  });

  test('extractFields should return true valid monthlyPayment', async () => {
    const { monthlyPayment } = extractFields('monthlyPayment');
    const isMonthlyPayment = await monthlyPayment.isValid('Payment');
    expect(isMonthlyPayment).toBeTruthy();
  });

  test('extractFields should return false invalid identificationType', async () => {
    const { identificationType } = extractFields('identificationType');
    const isIdentificationType = await identificationType.isValid(null);
    expect(isIdentificationType).toBeFalsy();
  });

  test('extractFields should return true valid identificationType', async () => {
    const { identificationType } = extractFields('identificationType');
    const isIdentificationType = await identificationType.isValid('familyBook');
    expect(isIdentificationType).toBeTruthy();
  });

  test('extractFields should return false invalid phoneNumber', async () => {
    const { phoneNumber } = extractFields('phoneNumber');
    const isPhoneNumber = await phoneNumber.isValid(1235467);
    expect(isPhoneNumber).toBeFalsy();
  });

  test('extractFields should return true valid phoneNumber', async () => {
    const { phoneNumber } = extractFields('phoneNumber');
    const isPhoneNumber = await phoneNumber.isValid('0983703011');
    expect(isPhoneNumber).toBeTruthy();
  });

  test('extractFields should return false invalid drivingLicence', async () => {
    const { drivingLicence } = extractFields('drivingLicence');
    const isDrivingLicence = await drivingLicence.isValid(null);
    expect(isDrivingLicence).toBeFalsy();
  });

  test('extractFields should return true valid drivingLicence', async () => {
    const { drivingLicence } = extractFields('drivingLicence');
    const isDrivingLicence = await drivingLicence.isValid('drivingLicence');
    expect(isDrivingLicence).toBeTruthy();
  });

  test('extractFields should return false invalid familyBook', async () => {
    const { familyBook } = extractFields('familyBook');
    const isFamilyBook = await familyBook.isValid(null);
    expect(isFamilyBook).toBeFalsy();
  });

  test('extractFields should return true valid familyBook', async () => {
    const { familyBook } = extractFields('familyBook');
    const isFamilyBook = await familyBook.isValid('familyBook');
    expect(isFamilyBook).toBeTruthy();
  });

  test('extractFields should return false invalid email', async () => {
    const { email } = extractFields('email');
    const isEmail = await email.isValid('nguyenhuu.uit');
    expect(isEmail).toBeFalsy();
  });

  test('extractFields should return true valid email', async () => {
    const { email } = extractFields('email');
    const isEmail = await email.isValid('nguyenhuu.uit@gmail.com');
    expect(isEmail).toBeTruthy();
  });

  test('extractFields should return false invalid acceptedTerm', async () => {
    const { acceptedTerm } = extractFields('acceptedTerm');
    const isAcceptedTerm = await acceptedTerm.isValid(false);
    expect(isAcceptedTerm).toBeFalsy();
  });

  test('extractFields should return true valid acceptedTerm', async () => {
    const { acceptedTerm } = extractFields('acceptedTerm');
    const isAcceptedTerm = await acceptedTerm.isValid(true);
    expect(isAcceptedTerm).toBeTruthy();
  });

  test('extractFields should return false invalid otp', async () => {
    const { otp } = extractFields('otp');
    const isOtp = await otp.isValid(null);
    expect(isOtp).toBeFalsy();
  });

  test('extractFields should return true valid otp', async () => {
    const { otp } = extractFields('otp');
    const isOtp = await otp.isValid('123456');
    expect(isOtp).toBeTruthy();
  });

  test('getValidationSchema should return false invalid field', async () => {
    const {
      fields: { firstName, phoneNumber },
    } = getValidationSchema(['firstName', 'phoneNumber']);
    const isfirstName = await firstName.isValid(null);
    const isPhoneNumber = await phoneNumber.isValid('str');
    expect(isfirstName).toBeFalsy();
    expect(isPhoneNumber).toBeFalsy();
  });

  test('getValidationSchema should return true valid field', async () => {
    const {
      fields: { firstName, phoneNumber },
    } = getValidationSchema(['firstName', 'phoneNumber']);
    const isfirstName = await firstName.isValid('Remy');
    const isPhoneNumber = await phoneNumber.isValid('0983703011');
    expect(isfirstName).toBeTruthy();
    expect(isPhoneNumber).toBeTruthy();
  });
});
