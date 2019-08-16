import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { ApiResponse } from './interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

const SKILL_QUERY = gql`
  query getSkills {
    skills {
      name
      documentationUrl
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  constructor(
    private apollo: Apollo,
    httpLink: HttpLink,
    private snackBar: MatSnackBar
  ) {
    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        snackBar.open('There was an error querying the DB.', null, {
          duration: 5000
        });
      }

      if (networkError) {
        snackBar.open('There was a network error, please try again', null, {
          duration: 5000
        });
      }
    });

    const link = httpLink.create({ uri: 'http://localhost:3000/graphql' });

    apollo.create({
      link: errorLink.concat(link),
      cache: new InMemoryCache()
    });
  }

  getSkills() {
    return this.apollo.watchQuery<ApiResponse>({
      query: SKILL_QUERY
    });
  }
}
