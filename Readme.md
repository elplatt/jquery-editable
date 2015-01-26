# jquery-editable v1.0.0

Make any text element user-editable.

Copyright (c) 2015 Edward L. Platt `ed@elplatt.com`  
Distributed under BSD 3-clause license.  

Usage:

    $('p').editable({
        "enable": true,
        "target": $('button')
    });

Whenever the `button` is clicked, the `p` will become focused and editable. On
blur, enter, or tab, the `p` will again be uneditable. Listen for a blur
event to capture the value.

    $('p').editable({"enable": flase});

Disable any previoulsy enabled editable behavior on `p`.

