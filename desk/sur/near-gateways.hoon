|%
+$  glob  (map path mime)
+$  metadata  [name=@t url=@t about=@t]  
+$  identifier  [=ship id=@uvH]
+$  gateway-action 
  $%  [%publish =metadata]
      [%install =identifier =metadata]
      [%delete =identifier]
  ==
::
+$  scry
  $%  [%heard =(map identifier metadata)]
      [%published =(map identifier metadata)]
      [%installed =(list identifier)]
      [%find-id =identifier]
  ==
::
+$  update 
  $%  [%failed-glob date=@da url=@t]
  ==
--