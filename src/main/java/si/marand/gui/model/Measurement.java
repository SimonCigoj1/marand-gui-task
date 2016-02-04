package si.marand.gui.model;

import java.util.Date;
//test test
public class Measurement {

	private int diastoloc;
	private int systolic;
	private float temperature;
	private int heartRate;
	private float spq2denominator;
	private float spq2numerator;
	private int spq2Type;
	private Date date;
	
	public Measurement() {}
	
	public Measurement(int diastoloc, int systolic, float temperature,
			int heartRate, float spq2denominator, float spq2numerator,
			int spq2Type, Date date) {
		this.diastoloc = diastoloc;
		this.systolic = systolic;
		this.temperature = temperature;
		this.heartRate = heartRate;
		this.spq2denominator = spq2denominator;
		this.spq2numerator = spq2numerator;
		this.spq2Type = spq2Type;
		this.date = date;
	}
	public int getDiastoloc() {
		return diastoloc;
	}
	public void setDiastoloc(int diastoloc) {
		this.diastoloc = diastoloc;
	}
	public int getSystolic() {
		return systolic;
	}
	public void setSystolic(int systolic) {
		this.systolic = systolic;
	}
	public float getTemperature() {
		return temperature;
	}
	public void setTemperature(float temperature) {
		this.temperature = temperature;
	}
	public int getHeartRate() {
		return heartRate;
	}
	public void setHeartRate(int heartRate) {
		this.heartRate = heartRate;
	}
	public float getSpq2denominator() {
		return spq2denominator;
	}
	public void setSpq2denominator(float spq2denominator) {
		this.spq2denominator = spq2denominator;
	}
	public float getSpq2numerator() {
		return spq2numerator;
	}
	public void setSpq2numerator(float spq2numerator) {
		this.spq2numerator = spq2numerator;
	}
	public int getSpq2Type() {
		return spq2Type;
	}
	public void setSpq2Type(int spq2Type) {
		this.spq2Type = spq2Type;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	
}
