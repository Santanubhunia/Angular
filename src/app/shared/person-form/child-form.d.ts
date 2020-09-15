interface AppForms {
  childForm: {
    id: string;
    prefix: string;
    firstName: string;
    middleName: string;
    lastName: string;
    suffix: string;
    dateOfBirth: Date;
    genderId: number;
    protectedInformation: {
      id: string;
      protectedInformationType: number;
      value: string;
    };
    doDId: string;
    addresses: {
      id: string;
      street: string;
      city: string;
      stateId: number;
      zipCode: string;
      country: string;
    };
    beneficiary: boolean;
    contactEmailAddress: {
      id: string;
      address: string;
    };
    contactPhoneNumber: {
      id: string;
      number: string;
    };
  };
  alternateId: boolean;
}
