import * as Vue from 'vue';
import sfcLoader from 'sfc-loader';
import { Modal, Toast } from 'bootstrap';
import axios from 'axios';
import photoswipe from 'photoswipe';
import photoswipeLightbox from 'photoswipe-lightbox';
import axiosMockAdapter from 'axios-mock-adapter';
import dayjs from 'dayjs';
import dayjsLocalizedFormat from 'dayjsLocalizedFormat';
import { getFile, } from './helpers.mjs';


const { loadModule } = sfcLoader.default || sfcLoader;

const options = {
	moduleCache: {
		vue: Vue,
		bootstrap: { Modal, Toast },
		axios,
		dayjs,
		'dayjs/plugin/localizedFormat': dayjsLocalizedFormat,
		photoswipe,
		'photoswipe/lightbox': photoswipeLightbox,
		'axios-mock-adapter': axiosMockAdapter,
	},
	getFile,
	addStyle(textContent) {
		const style = Object.assign(document.createElement('style'), {
			textContent,
		});
		const refStyle = document.head.getElementsByTagName('style')[0] ?? null;
		document.head.insertBefore(style, refStyle);
	},
};

export {
  loadModule, options,
}
