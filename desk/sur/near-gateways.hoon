|%
+$  glob  (map path mime)
+$  metadata  [name=@t url=@t about=@t thumbnail=@t]
+$  identifier  [=ship id=@uvH]
+$  gateway-action
  $%  [%publish =metadata blob=@t]
      [%install =identifier =metadata]
      [%delete =identifier]
      [%hide =identifier]
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
  $%  [%globbed =identifier =metadata]
      [%failed-glob date=@da url=@t]
  ==
--
