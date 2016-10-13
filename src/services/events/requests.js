import URLS from '../urls';

export default {
  createEvent(context, eventBody) {
    return context.$http.post(URLS.EVENTS_URL, eventBody)
  }
};