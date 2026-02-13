export class Step {
  constructor({ id, actionId, number, description, details }) {
    this.id = id;
    this.actionId = actionId;
    this.number = number;
    this.description = description || "";
    this.details = details || {};
  }

  get fullDescription() {
    let text = this.description;
    
    Object.keys(this.details).forEach((key) => {
      const value = this.details[key];
      const placeholder = `[${key}]`;

      if (value !== null && value !== undefined) {
        text = text.replace(placeholder, value);
      } else {
        text = text.replace(placeholder, '');
      }
    });
    return text.replace(/\s+/g, ' ').trim();
  }
}