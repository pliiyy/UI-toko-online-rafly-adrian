"use client";
import {
  Document,
  Page,
  Text,
  View,
  PDFViewer,
  Font,
  StyleSheet,
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

Font.register({
  family: "SourceSansPro",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/sourcesanspro/v14/6xK3dSBYKcSV-LCoeQqfX1RYOo3aPw.ttf",
    }, // font-style: normal, font-weight: normal
    {
      src: "https://fonts.gstatic.com/s/sourcesanspro/v14/6xKydSBYKcSV-LCoeQqfX1RYOo3i54rAkA.ttf",
      fontWeight: 600,
    },
  ],
});
const tw = createTw({
  theme: {
    extend: {
      colors: {
        custom: "#bada55",
      },
    },
  },
});
const style = StyleSheet.create({
  pages: {
    padding: 30,
    fontFamily: "SourceSansPro",
    fontSize: 10,
  },
});
export const UIAkad = ({ title }: { title: string }) => {
  return (
    <PDFViewer style={{ width: "100%", height: "100%" }}>
      <Document title={"AKAD " + title}>
        <Analisa />
      </Document>
    </PDFViewer>
  );
};

export const Analisa = () => {
  return (
    <Page size={"A4"} style={style.pages}>
      <View>
        <Text>Analisa Perhitungan</Text>
      </View>
    </Page>
  );
};
