export class Step {
  constructor({ id, actionId, number, description, details }) {
    this.id = id;
    this.actionId = actionId;
    this.number = number;
    this._description = description || "";
    this._details = details || {};
  }

  get fullDescription() {
    let text = this._description;
    
    Object.keys(this._details).forEach((key) => {
      const value = this._details[key];
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