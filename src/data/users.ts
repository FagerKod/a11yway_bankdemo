export interface User {
  id: string;
  firstName: string;
  lastName: string;
  personnummer: string;
  email: string;
  phone: string;
}

/**
 * Mock user for the demo
 * Swedish name and personnummer format
 */
export const mockUser: User = {
  id: '1',
  firstName: 'Erik',
  lastName: 'Svensson',
  personnummer: '19850423-1234',
  email: 'erik.svensson@example.se',
  phone: '0701234567',
};

/**
 * Get full name from user object
 */
export function getFullName(user: User): string {
  return `${user.firstName} ${user.lastName}`;
}
