package si.marand.gui.model;

import java.util.List;

public class Patient {

	private String name;
	private String surname;
	private List<Measurement> measurements;
	
	public Patient() {}
	
	public Patient(String name, String surname, List<Measurement> measurements) {
		this.name = name;
		this.surname = surname;
		this.measurements = measurements;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	public List<Measurement> getMeasurements() {
		return measurements;
	}
	public void setMeasurements(List<Measurement> measurements) {
		this.measurements = measurements;
	}
	
	
	
	
}
