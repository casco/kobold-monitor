# From Jquery to plain dom javascript
1. `.on('mousedown',function(e){...` became  `.addEventListener('mousedown',function(e){...`
2. `$(*).`became `document.querySelectorAll("*").forEach(...`
3. outerWidth() and outerHeight() were replaced by offsetWidth and offsetHeight

Still to transform:
4. attr() was replaced by getAttribute()
5. `$(this.element).css("cursor") != "pointer"` became `getComputedStyle(this.element,"cursor") != "pointer"`
6. `($(this.element).parents("a")` became `this.getParents(this.elem, "a")` with a self defined method getParents
