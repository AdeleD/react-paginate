## >= 4.0.0

* Some variable have been renamed:
  * `clickCallback` -> `onPageChange`
  * `initialSelected` -> `initialPage`
  * `forceSelected` -> `forcePage`
  * `pageNum` -> `pageCount`

* `onClick` events have been moved on `<a>` tags (previously on `<li>`s).


## >= 3.0.0

`clickCallback` (`onPageChange`) isn't called during initialization anymore.


## >= 1.0.0

HTML Structure:

```html
<ul class="pagination">
  <li class="disabled"><a href="#"><span>«</span></a></li>
  <li class="active"><a href="#">1</a></li>
  <li><a href="#">2</a></li>
  <li><a href="#">3</a></li>
  <li><a href="#">4</a></li>
  <li><a href="#">5</a></li>
  <li><a href="#"><span>»</span></a></li>
</ul>
```


## <= 0.5.7

HTML Structure:

```html
<ul>
  <li class="disabled"><a href="#"><span>«</span></a></li>
  <li>
    <ul>
      <li class="active"><a href="#">1</a></li>
      <li><a href="#">2</a></li>
      <li><a href="#">3</a></li>
      <li><a href="#">4</a></li>
      <li><a href="#">5</a></li>
    </ul>
  </li>
  <li><a href="#"><span>»</span></a></li>
</ul>
```
