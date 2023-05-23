using System.Text.Json;
using System.Text.Json.Serialization;

namespace API.ViewModels.Converters;

public class ExpandableConverter<TModel, TKey> : JsonConverter<ExpandableModel<TModel, TKey>> where TModel : EntityModel<TKey>
{
    public override ExpandableModel<TModel, TKey>? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        throw new NotImplementedException();
    }

    public override void Write(Utf8JsonWriter writer, ExpandableModel<TModel, TKey> value, JsonSerializerOptions options)
    {
        if (value.Expanded)
        {
            JsonSerializer.Serialize(writer, value.Model, options);
        }
        else
        {
            writer.WriteStringValue(value.Model.Key.ToString());
        }
    }
}