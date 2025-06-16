document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
  });
  
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const ul = document.getElementById('myUL');
    ul.innerHTML = '';
    
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task.text;
      if (task.checked) {
        li.classList.add('checked');
      }
      
      const span = document.createElement('SPAN');
      span.className = 'close';
      span.textContent = '\u00D7';
      li.appendChild(span);
      
      ul.appendChild(li);
    });
    
    const closeButtons = document.getElementsByClassName('close');
    for (let i = 0; i < closeButtons.length; i++) {
      closeButtons[i].onclick = function() {
        this.parentElement.style.display = 'none';
        saveTasks();
      }
    }
  }
  
  function saveTasks() {
    const tasks = [];
    const lis = document.querySelectorAll('#myUL li');
    
    lis.forEach(li => {
      if (li.style.display !== 'none') {
        tasks.push({
          text: li.textContent.replace('\u00D7', '').trim(),
          checked: li.classList.contains('checked')
        });
      }
    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  var list = document.querySelector('ul');
  list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
      saveTasks();
    }
  }, false);
  
  function newElement() {
    var inputValue = document.getElementById('myInput').value.trim();
    if (inputValue === '') {
      alert('Você deve escrever algo!');
      return;
    }
  
    var li = document.createElement('li');
    li.textContent = inputValue;
    
    var span = document.createElement('SPAN');
    span.className = 'close';
    span.textContent = '\u00D7';
    li.appendChild(span);
    
    document.getElementById('myUL').appendChild(li);
    document.getElementById('myInput').value = '';
    
    span.onclick = function() {
      this.parentElement.style.display = 'none';
      saveTasks();
    }
    
    saveTasks();
  }