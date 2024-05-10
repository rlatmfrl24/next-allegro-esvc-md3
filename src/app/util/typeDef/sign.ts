export type SignUpFormProps = {
  companyName: string;
  companyType: string;
  address: {
    country: string;
    zipCode: string;
    city: string;
    street: string;
  };
  userId: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  tel: string;
  fax: string;
  email: string;
  trade: string;
  contactOffice: string;
  recentBLNumber: string;
  comment: string;
};
