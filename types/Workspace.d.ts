interface Workspace extends Workspace {
  Spawner: Part;
  Camera: Camera;
  Baseplate: Part & {
    Texture: Texture;
  };
  Base: Part;
  ENEMIES: Folder;
  Ignore: Folder;
  ['Cheese Burger']: Part & {
    Mesh: SpecialMesh;
  };
  SpawnLocation: SpawnLocation & {
    Decal: Decal;
  };
  __Prototyping: Folder & {
    MeshPart12: MeshPart;
    MeshPart14: MeshPart;
    MeshPart19: MeshPart;
    MeshPart4: MeshPart;
    MeshPart13: MeshPart;
    MeshPart5: MeshPart;
    MeshPart16: MeshPart;
    MeshPart8: MeshPart;
    MeshPart23: MeshPart;
    MeshPart22: MeshPart;
    MeshPart9: MeshPart;
    MeshPart7: MeshPart;
    MeshPart3: MeshPart;
    MeshPart17: MeshPart;
    MeshPart6: MeshPart;
    MeshPart20: MeshPart;
    MeshPart18: MeshPart;
    MeshPart10: MeshPart;
    MeshPart11: MeshPart;
    MeshPart1: MeshPart;
    MeshPart21: MeshPart;
    MeshPart15: MeshPart;
    MeshPart2: MeshPart;
  };
}
