import { onError } from 'apollo-link-error';

export default function(ctx) {
  const errorLink = onError(({ graphQLErrors, networkError, errors }) => {
    if (graphQLErrors[0].extensions.status === 401) {
        return window.location.href = '/signin';
    }
  });
  return {
    link: errorLink,

    // httpEndpoint: 'https://testby.apisituk.igsindonesia.org//graphql',
    httpEndpoint: 'https://test2.apisituk.igsindonesia.org/graphql',
    httpLinkOptions: {
      credentials: 'same-origin'
    },
  };
}