package com.twitterdan.utils;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateSerializer extends StdSerializer<Date> {
  private static final SimpleDateFormat FORMATTER = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss");

  public DateSerializer() {
    this(null);
  }

  public DateSerializer(Class<Date> dateClass) {
    super(dateClass);
  }

  @Override
  public void serialize(Date date, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
    jsonGenerator.writeString(FORMATTER.format(date));
  }
}
