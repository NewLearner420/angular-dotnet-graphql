import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      firstName
      lastName
      email
      createdAt
    }
  }
`;

const ADD_USER = gql`
  mutation AddUser($firstName: String!, $lastName: String!, $email: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email) {
      id
      firstName
      lastName
      email
      createdAt
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($id: Int!, $firstName: String, $lastName: String, $email: String) {
    updateUser(id: $id, firstName: $firstName, lastName: $lastName, email: $email) {
      id
      firstName
      lastName
      email
      createdAt
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id)
  }
`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apollo: Apollo) {}

  getUsers(): Observable<any> {
    return this.apollo.watchQuery({ query: GET_USERS }).valueChanges;
  }

  addUser(firstName: string, lastName: string, email: string): Observable<any> {
    return this.apollo.mutate({
      mutation: ADD_USER,
      variables: { firstName, lastName, email },
      refetchQueries: [{ query: GET_USERS }]
    });
  }

  updateUser(id: number, firstName?: string, lastName?: string, email?: string): Observable<any> {
    return this.apollo.mutate({
      mutation: UPDATE_USER,
      variables: { id, firstName, lastName, email },
      refetchQueries: [{ query: GET_USERS }]
    });
  }

  deleteUser(id: number): Observable<any> {
    return this.apollo.mutate({
      mutation: DELETE_USER,
      variables: { id },
      refetchQueries: [{ query: GET_USERS }]
    });
  }
}