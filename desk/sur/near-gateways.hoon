|%
+$  glob
  $+  glob
  (map path mime)
+$  metadata
  $+  metadata
  [name=@t date=@da url=@t about=@t thumbnail=@t]
+$  init-metadata
  $+  init-metadata
  [name=@t url=@t about=@t thumbnail=@t]
+$  identifier
  $+  identifier
  [=ship id=@uvH]
+$  gateway-action
  $+  gateway-action
  $%  [%publish =init-metadata]
      [%install =identifier =metadata]
      [%delete =identifier]
      [%hide =identifier]
  ==
::
+$  scry
  $+  scry
  $%  [%heard =(map identifier metadata)]
      [%published =(map identifier metadata)]
      [%installed =(list identifier)]
      [%find-id =identifier]
  ==
::
+$  update
  $+  update
  $%  [%installed =identifier =metadata]
      [%published =identifier =metadata]
      [%failed-glob date=@da url=@t]
  ==
--
