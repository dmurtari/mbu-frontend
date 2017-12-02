export default (array) => {
  return array.sort(function (a, b) {
    var aa = a.split(/(?=\D)/),
        bb = b.split(/(?=\D)/);
    return aa[0] - bb[0] || (aa[1] || '').localeCompare(bb[1] || '');
  });
}
