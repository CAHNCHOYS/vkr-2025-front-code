// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import defaults from './defaults';
import icons from './icons';

export const vuetify = createVuetify({
  components,
  icons,
  defaults,
});
