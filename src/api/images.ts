import type Image from '@/entities/image';
import axios from 'axios';

const listUrl = "https://picsum.photos/v2/list";
let images = [];

async function getListPage(pageNumber = 1) {
  return axios.get(listUrl + "?page=" + pageNumber).then(
    function (response) {
      if (response != null) {
        images = response.data as Array<Image>;
        return images;
      }
    }
  ).catch(
    function (error) {
      console.log('Error 404');
    }
  );
}

export { getListPage };
//console.log(123); 