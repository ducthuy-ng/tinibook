class InvalidBuilding implements Error {
  message: string;
  name = 'InvalidBuilding';

  constructor(buildingId: string) {
    this.message = `Invalid building ID: ${buildingId}`;
  }
}

export { InvalidBuilding };
