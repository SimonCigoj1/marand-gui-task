package si.marand.gui.rest;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import si.marand.gui.model.Measurement;
import si.marand.gui.model.Patient;

@Path("/patient-data")
public class PatientData {

	  @GET
	  @Path("/{patientId}")
	  @Produces(MediaType.APPLICATION_JSON)
	  public Response lookupMemberById(@PathParam("patientId") long patientId) {
	       
		try{
			
			InputStream in = getClass().getResourceAsStream("/patient-data.csv");
			BufferedReader reader = new BufferedReader(new InputStreamReader(in));
			
			StringBuilder builder = new StringBuilder();
			
			builder.append("{");
			builder.append("\"name\":\"Simon\",");
			builder.append("\"surname\":\"Cigoj\",");
			builder.append("\"measurements\":[");		
			
			String line = reader.readLine();
			while(line != null){
				//System.out.println(line);
				String[] splitedLine = line.split(",");
				
				builder.append("{\"diastoloc\":").append(splitedLine[0]).append(",");
				builder.append("\"systolic\":").append(splitedLine[1]).append(",");
				builder.append("\"temperature\":").append(splitedLine[2]).append(",");
				builder.append("\"heartRate\":").append(splitedLine[3]).append(",");
				builder.append("\"spq2denominator\":").append(splitedLine[4]).append(",");
				builder.append("\"spq2numerator\":").append(splitedLine[5]).append(",");
				builder.append("\"spq2Type\":").append(splitedLine[6]).append(",");
				
				DateFormat df = new SimpleDateFormat("d.M.yyyy");
				DateFormat df2 = new SimpleDateFormat("yyyy-M-d");
				Date date =  df.parse(splitedLine[7]);
				
				builder.append("\"date\":\"").append(df2.format(date)).append("\"},");
							
				line = reader.readLine();
			}
			
			builder.deleteCharAt(builder.length()-1);
			builder.append("]}");

			return Response.status(201).entity(builder.toString()).build();
			
		} catch (Exception e){
			e.printStackTrace();
			return Response.status(400).entity("{\"success\": 0,\"message\":\"Error during data read ..."+e.getMessage()+" , \"errorCode\":-1}").build();
		}	
		  
	}
	
}
